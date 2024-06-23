import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection } from './database/db.js';
import router from './routes/index.js';

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/image/', express.static(path.join(__dirname, 'image')));
app.use(router);

app.listen(process.env.PORT_DEV, () => {
  testConnection();
  console.log(`Server started on http://localhost:${process.env.PORT_DEV}`);
});
