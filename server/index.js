import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.config.js';
import authRouter from './routes/auth.routes.js';
import simulationRouter from './routes/simulation.routes.js';
import userRouter from './routes/user.routes.js';
import aiRouter from './routes/ai.routes.js';
import financialRouter from './routes/financial.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/simulations", simulationRouter);
app.use("/api/users", userRouter);
app.use("/api/ai", aiRouter);
app.use("/api/financial", financialRouter);

app.use(errorMiddleware); // Global error handler

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
})