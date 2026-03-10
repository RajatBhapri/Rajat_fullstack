import pg from "pg";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
app.use(express.json());

async function migrate() {
  console.log("Running migration...");

  await pool.query(`DROP TABLE IF EXISTS task_tags`);
  await pool.query(`DROP TABLE IF EXISTS comments`);
  await pool.query(`DROP TABLE IF EXISTS tags`);
  await pool.query(`DROP TABLE IF EXISTS tasks`);
  await pool.query(`DROP TABLE IF EXISTS projects`);
  await pool.query(`DROP TABLE IF EXISTS users`);

  await pool.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      preferences JSONB DEFAULT '{}'
    )
  `);

  await pool.query(`
    CREATE TABLE projects (
      id SERIAL PRIMARY KEY,
      owner_id INTEGER REFERENCES users(id),
      name TEXT NOT NULL,
      metadata JSONB DEFAULT '{}',
      task_count INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE tasks (
      id SERIAL PRIMARY KEY,
      project_id INTEGER REFERENCES projects(id),
      assignee_id INTEGER REFERENCES users(id),
      title TEXT,
      status TEXT DEFAULT 'todo',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE tags (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE
    )
  `);

  // MANY TO MANY
  await pool.query(`
    CREATE TABLE task_tags (
      task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
      tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
      PRIMARY KEY(task_id, tag_id)
    )
  `);

  await pool.query(`
    CREATE TABLE comments (
      id SERIAL PRIMARY KEY,
      task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
      author_id INTEGER REFERENCES users(id),
      parent_comment_id INTEGER REFERENCES comments(id),
      content TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE OR REPLACE FUNCTION update_project_task_count()
    RETURNS TRIGGER AS $$
    BEGIN
      IF TG_OP = 'INSERT' THEN
        UPDATE projects
        SET task_count = task_count + 1
        WHERE id = NEW.project_id;

      ELSIF TG_OP = 'DELETE' THEN
        UPDATE projects
        SET task_count = task_count - 1
        WHERE id = OLD.project_id;
      END IF;

      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql
  `);

  await pool.query(`
    CREATE TRIGGER task_insert_trigger
    AFTER INSERT ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_project_task_count()
  `);

  await pool.query(`
    CREATE TRIGGER task_delete_trigger
    AFTER DELETE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_project_task_count()
  `);

  console.log("Schema created.");
}

async function createUser(name: string, email: string, preferences: any) {
  const res = await pool.query(
    `INSERT INTO users(name,email,preferences)
     VALUES($1,$2,$3)
     RETURNING *`,
    [name, email, preferences],
  );

  return res.rows[0];
}

async function createProject(ownerId: number, name: string) {
  const res = await pool.query(
    `INSERT INTO projects(owner_id,name)
     VALUES($1,$2)
     RETURNING *`,
    [ownerId, name],
  );

  return res.rows[0];
}

async function createTask(
  projectId: number,
  assigneeId: number,
  title: string,
) {
  const res = await pool.query(
    `INSERT INTO tasks(project_id,assignee_id,title)
     VALUES($1,$2,$3)
     RETURNING *`,
    [projectId, assigneeId, title],
  );

  return res.rows[0];
}

async function addTag(name: string) {
  const res = await pool.query(
    `INSERT INTO tags(name)
     VALUES($1)
     RETURNING *`,
    [name],
  );

  return res.rows[0];
}

async function tagTask(taskId: number, tagId: number) {
  await pool.query(
    `INSERT INTO task_tags(task_id,tag_id)
     VALUES($1,$2)`,
    [taskId, tagId],
  );
}

async function addComment(
  taskId: number,
  authorId: number,
  content: string,
  parent?: number,
) {
  await pool.query(
    `INSERT INTO comments(task_id,author_id,content,parent_comment_id)
     VALUES($1,$2,$3,$4)`,
    [taskId, authorId, content, parent || null],
  );
}

app.post("/users", async (req: any, res: any) => {
  const { name, email, preferences } = req.body;
  const user = await createUser(name, email, preferences);
  res.json(user);
});

app.post("/projects", async (req: any, res: any) => {
  const { ownerId, name } = req.body;
  const project = await createProject(ownerId, name);
  res.json(project);
});

app.post("/tasks", async (req: any, res: any) => {
  const { projectId, assigneeId, title } = req.body;
  const task = await createTask(projectId, assigneeId, title);
  res.json(task);
});

app.get("/projects/:id/tasks", async (req: any, res: any) => {
  const result = await pool.query(
    `SELECT * FROM tasks
     WHERE project_id=$1`,
    [req.params.id],
  );

  res.json(result.rows);
});

async function relationshipQueries() {
  console.log("\nTasks with project and assignee:");

  const result = await pool.query(`
    SELECT
      t.title,
      p.name AS project,
      u.name AS assignee
    FROM tasks t
    JOIN projects p ON t.project_id = p.id
    JOIN users u ON t.assignee_id = u.id
  `);

  console.table(result.rows);

  console.log("\nComments with task and author:");

  const comments = await pool.query(`
    SELECT
      c.content,
      t.title AS task,
      u.name AS author
    FROM comments c
    JOIN tasks t ON c.task_id = t.id
    JOIN users u ON c.author_id = u.id
  `);

  console.table(comments.rows);
}

async function performanceTest() {
  console.log("\nPerformance test:");

  const start1 = Date.now();

  const normalized = await pool.query(`
    SELECT COUNT(*)
    FROM tasks
    WHERE project_id = 1
  `);

  const end1 = Date.now();

  console.log("Normalized count:", normalized.rows[0].count);
  console.log("Time:", end1 - start1, "ms");

  const start2 = Date.now();

  const denorm = await pool.query(`
    SELECT task_count
    FROM projects
    WHERE id = 1
  `);

  const end2 = Date.now();

  console.log("Denormalized count:", denorm.rows[0].task_count);
  console.log("Time:", end2 - start2, "ms");
}

async function seed() {
  console.log("Seeding data...");

  const user = await createUser("Rajat", "rajat@email.com", {
    theme: "dark",
  });

  const project = await createProject(user.id, "Backend System");

  const task = await createTask(project.id, user.id, "Design database");

  const tag = await addTag("backend");

  await tagTask(task.id, tag.id);

  await addComment(task.id, user.id, "Initial schema created");

  console.log("Seed data inserted.");
}

async function start() {
  await migrate();
  await seed();

  await relationshipQueries();

  await performanceTest();

  app.listen(3000, () => {
    console.log("\nServer running on http://localhost:3000");
  });
}

start();
