import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await pool.query(`DROP TABLE IF EXISTS orders_denormalized`);
  await pool.query(`
        CREATE TABLE orders_denormalized (
            id SERIAL PRIMARY KEY,
            customer_name VARCHAR(100),
            customer_email VARCHAR(100),
            product_name VARCHAR(100),
            price NUMERIC(10,2)
        )
    `);

  await pool.query(`
        INSERT INTO orders_denormalized (customer_name, customer_email, product_name, price)
        VALUES 
        ('rajat', 'rajat@example.com', 'Laptop', 120000),
        ('rajat', 'rajat@example.com', 'Mouse', 250),
        ('Bob', 'bob@example.com', 'Keyboard', 750)
    `);

  console.log("Denormalized orders:");
  const denorm = await pool.query(`SELECT * FROM orders_denormalized`);
  console.table(denorm.rows);

  await pool.query(`
        UPDATE orders_denormalized
        SET customer_email = 'rajat_new@example.com'
        WHERE customer_name = 'rajat'
    `);

  console.log("Updated denormalized orders:");
  const denormUpdated = await pool.query(`SELECT * FROM orders_denormalized`);
  console.table(denormUpdated.rows);

  await pool.query(`DROP TABLE IF EXISTS orders`);
  await pool.query(`DROP TABLE IF EXISTS customers`);

  await pool.query(`
        CREATE TABLE customers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100)
        )
    `);

  await pool.query(`
        CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            customer_id INT REFERENCES customers(id),
            product_name VARCHAR(100),
            price NUMERIC(10,2)
        )
    `);

  await pool.query(`
        INSERT INTO customers (name, email)
        VALUES ('rajat', 'rajat@example.com'), ('Bob', 'bob@example.com')
    `);

  await pool.query(`
        INSERT INTO orders (customer_id, product_name, price)
        VALUES 
        (1, 'Laptop', 1200),
        (1, 'Mouse', 25),
        (2, 'Keyboard', 75)
    `);

  await pool.query(`
        UPDATE customers
        SET email = 'rajat_new@example.com'
        WHERE name = 'rajat'
    `);

  console.log("Normalized orders with join:");
  const norm = await pool.query(`
        SELECT o.id, c.name, c.email, o.product_name, o.price
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
    `);
  console.table(norm.rows);

  await pool.end();
}

main().catch(console.error);
