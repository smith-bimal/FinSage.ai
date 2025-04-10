import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.config.js';
import authRouter from './routes/auth.routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter)

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
})