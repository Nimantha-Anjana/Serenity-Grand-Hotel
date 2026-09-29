import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'serenity_grand_hotel',
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'mysql',
  logging: process.env.DB_LOGGING === 'true' ? console.log : false,
  define: { charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' },
  pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
  timezone: '+00:00',
});

export async function connectDB() {
  if (!/^[A-Za-z0-9_]+$/.test(DB_NAME)) throw new Error('Invalid DB_NAME.');
  const connection = await mysql.createConnection({ host: DB_HOST, port: Number(DB_PORT), user: DB_USER, password: DB_PASSWORD });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await connection.end();
  await sequelize.authenticate();
  await import('../models/index.js');
  console.log(`MySQL connected: ${DB_HOST}:${DB_PORT}/${DB_NAME}`);
}

export default connectDB;
