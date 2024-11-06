// src/config/database.ts
import { DataSource } from 'typeorm';
import { Admin } from '../entities/Admin';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Debugging: Check if environment variables are loaded correctly
console.log("Database Host:", process.env.DATABASE_HOST);
console.log("Database User:", process.env.DATABASE_USER);
console.log("Database Password:", process.env.DATABASE_PASSWORD);
console.log("Database Name:", process.env.DATABASE_NAME);

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Admin],
  synchronize: true,
});
