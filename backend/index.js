import express from 'express';
import cors from 'cors';
import dotEnv from 'dotenv';
import db from './db.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import verificationRouter from './routes/verificationRoutes.js';
import depositRouter from './routes/depositRoutes.js';
import accountRouter from './routes/accountRoutes.js';
import withdrawRouter from './routes/withdrawRoutes.js';
import convertRouter from './routes/convertRoutes.js';

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Enable CORS first — before routes
app.use(cors());

app.use(express.json());

// ✅ Then register your routes
app.use('/', authRouter);
app.use('/api', userRouter);
app.use('/api', verificationRouter);
app.use('/api', depositRouter);
app.use('/api', accountRouter);
app.use('/api', withdrawRouter);
app.use('/api', convertRouter);
app.use("/assets", express.static("assets"));

// ✅ Start DB and server
db.query('SELECT 1')
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('Database connection error:', err);
  });
