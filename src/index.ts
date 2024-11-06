// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/adminRoutes';
import { AppDataSource } from './config/database';
import * as dotenv from 'dotenv';

import "reflect-metadata";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/admin', adminRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initialized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log('Error initializing Data Source:', error));
