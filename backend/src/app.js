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

// Load environment variables from a .env file
dotenv.config();

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for specific origins and methods
// CORS settings allow the front-end to make requests to this API from specified origins.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true   // Allow cookies to be sent with requests
}));

app.use(helmet()); // Set security-related HTTP headers to protect the app from common attacks (e.g., XSS, clickjacking)
app.use(express.json({ limit: '16kb' })); // Parse JSON requests with a limit of 16KB  
app.use(express.urlencoded({ extended: true, limit: '16kb' })); // Parse URL-encoded requests with a limit of 16KB
app.use(express.static('public'));  // Serve static files
app.use(cookieParser());    // Parse cookies

app.use(mongoSanitize());   // Sanitize user input to prevent NoSQL injection

app.use(xss());     // Sanitize user input to prevent cross-site scripting (XSS) attacks


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Log requests in dev mode
}

// Apply rate limiting to prevent brute-force or DoS attacks by limiting the number of requests from a single IP within a time window
// This helps protect the API from excessive load or abuse.
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

// Global error handler middleware to handle errors from any route
// It catches and processes all unhandled errors in a centralized way.
app.use(errorHandler);

export { app };