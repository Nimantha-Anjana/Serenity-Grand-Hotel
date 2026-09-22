import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'serenity_grand_hotel',
} = process.env;

// One shared connection (pool) used by every model
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'mysql',
  logging: false, // set to console.log to see every SQL query
  define: { charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' },
});

// Creates the database if it does not exist yet, then connects
const connectDB = async () => {
  if (!/^[A-Za-z0-9_]+$/.test(DB_NAME)) {
    throw new Error('DB_NAME may only contain letters, numbers and underscores.');
  }

  const server = await mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
  });
  await server.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await server.end();

  await sequelize.authenticate();
  await import('../models/index.js'); // registers the models + relations
  await sequelize.sync(); // creates any missing tables (does not touch existing ones)

  console.log(`MySQL connected: ${DB_HOST}:${DB_PORT}/${DB_NAME}`);
};

export default connectDB;
