import express from 'express';
import cors from 'cors';
import dotEnv from 'dotenv';
import db from './db.js';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import verificationRouter from './routes/verificationRoutes.js';

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Enable CORS first — before routes
app.use(cors());

app.use(express.json());

// ✅ Then register your routes
app.use('/api', userRouter);
app.use('/', authRouter);
app.use('/api', verificationRouter);
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
