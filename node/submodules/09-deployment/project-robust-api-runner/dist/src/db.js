import pkg from "pg";
const { Pool } = pkg;
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL ||
        "postgres://postgres:postgres@localhost:5432/postgres",
});
export const closeDb = async () => {
    await pool.end();
};
//# sourceMappingURL=db.js.map