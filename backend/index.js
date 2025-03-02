import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import financerRouter from './routes/financer.Router.js'
import customerRouter from './routes/customer.Router.js'
import adminRouter from './routes/admin.Router.js';
import cookieParser from 'cookie-parser';
import cors from "cors"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());


// Enable CORS
const allowedOrigins = ['http://localhost:5173']
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

// Connect to mongoDb
connectDB();

// Middleware


// Routes
app.use('/financer', financerRouter);
app.use('/customer', customerRouter);
app.use('/admin', adminRouter)



app.get('/', (req, res) => {
    res.send('Hello Sartaj Alam')
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})