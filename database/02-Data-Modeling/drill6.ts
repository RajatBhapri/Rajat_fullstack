import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    console.log("Resetting tables...");

    await pool.query(`DROP TABLE IF EXISTS comments6`);
    await pool.query(`DROP TABLE IF EXISTS tasks6`);
    await pool.query(`DROP TABLE IF EXISTS projects6`);
    await pool.query(`DROP TABLE IF EXISTS user_preferences6`);
    await pool.query(`DROP TABLE IF EXISTS users6`);

    await pool.query(`
      CREATE TABLE users6 (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      )
    `);

    await pool.query(`
      CREATE TABLE projects6 (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        owner_id INTEGER REFERENCES users6(id),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE tasks6 (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        user_id INTEGER REFERENCES users6(id),
        project_id INTEGER REFERENCES projects6(id),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE comments6 (
        id SERIAL PRIMARY KEY,
        task_id INTEGER REFERENCES tasks6(id),
        author_id INTEGER REFERENCES users6(id),
        content TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE user_preferences6 (
        user_id INTEGER PRIMARY KEY REFERENCES users6(id),
        preferences JSONB
      )
    `);

    console.log("Tables created.");

    await pool.query(`
      INSERT INTO users6 (name)
      VALUES ('Rajat'), ('Bob'), ('Charlie')
    `);

    await pool.query(`
      INSERT INTO projects6 (name, owner_id)
      VALUES
      ('Backend API', 1),
      ('Frontend App', 2)
    `);

    await pool.query(`
      INSERT INTO tasks6 (title, user_id, project_id)
      VALUES
      ('Design ', 1, 1),
      ('Build ', 1, 1),
      ('Create ', 2, 2),
      ('Buy', 3, NULL)
    `);

    await pool.query(`
      INSERT INTO comments6 (task_id, author_id, content)
      VALUES
      (1, 2, 'Looks good'),
      (1, 3, 'Consider adding indexes'),
      (2, 2, 'API should support JWT'),
      (3, 1, 'UI should be responsive')
    `);

    await pool.query(`
      INSERT INTO user_preferences6 (user_id, preferences)
      VALUES
      (1, '{"theme":"dark","notifications":true}'),
      (2, '{"theme":"light","language":"en"}'),
      (3, '{"theme":"dark","dashboard_layout":"compact"}')
    `);

    console.log("Sample data inserted.");

    console.log("\nTasks with their project names:");

    const tasksWithProjects = await pool.query(`
      SELECT
        t.id,
        t.title,
        p.name AS project
      FROM tasks6 t
      LEFT JOIN projects6 p
      ON t.project_id = p.id
    `);

    console.table(tasksWithProjects.rows);

    console.log("\nComments with task title and author:");

    const comments = await pool.query(`
      SELECT
        c.content,
        t.title AS task,
        u.name AS author,
        c.created_at
      FROM comments6 c
      JOIN tasks6 t ON c.task_id = t.id
      JOIN users6 u ON c.author_id = u.id
    `);

    console.table(comments.rows);

    console.log("\nProjects with task count:");

    const projectStats = await pool.query(`
      SELECT
        p.name,
        COUNT(t.id) AS task_count
      FROM projects6 p
      LEFT JOIN tasks6 t
      ON p.id = t.project_id
      GROUP BY p.id
    `);

    console.table(projectStats.rows);

    console.log("\nUser preferences:");

    const prefs = await pool.query(`
      SELECT
        u.name,
        up.preferences
      FROM user_preferences6 up
      JOIN users6 u
      ON up.user_id = u.id
    `);

    console.table(prefs.rows);

    console.log("\nUsers using dark theme:");

    const darkThemeUsers = await pool.query(`
      SELECT
        u.name
      FROM user_preferences6 up
      JOIN users6 u
      ON up.user_id = u.id
      WHERE up.preferences->>'theme' = 'dark'
    `);

    console.table(darkThemeUsers.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

main();
