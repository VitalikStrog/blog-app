import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { postRouter } from './routers/postRouter.js';
import { setupDb } from './setup.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use('/posts', postRouter);
app.use(errorMiddleware);

app.listen(PORT);
console.log(`Server is running on http://localhost:${process.env.PORT} port`);

await setupDb()
