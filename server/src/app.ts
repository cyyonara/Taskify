import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotEnv from 'dotenv';
import morgan from 'morgan';
import authRouter from './routes/auth.router';
import taskRouter from './routes/task.router';
import userRouter from './routes/user.router';
import { errorHandler, notFound } from './middlewares/errorHandler';
import { connect } from './config/connect';

dotEnv.config();

const app: Application = express();
const server = http.createServer(app);
const port = process.env.PORT || 4001;
connect();

const client =
    process.env.NODE_ENV === 'dev' ? process.env.CLIENT_DEV : process.env.CLIENT_PROD;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: [client as string],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/user', userRouter);

app.use(notFound);
app.use(errorHandler);

server.listen(port, () => console.log(`Server is running at port ${port}`));
