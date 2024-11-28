import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { errorHandler } from './utils/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(helmet()); // Security headers
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Log requests in dev mode
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Routes Import
import userRouter from './routes/user.routes.js';
import booksRouter from './routes/books.routes.js';
import adminRoutes from './routes/admin.routes.js'

// Routes Declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', booksRouter);
app.use('/api/v1/admin',adminRoutes);

app.use(errorHandler);

export { app };