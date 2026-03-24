import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import authRoutes from './routes/auth.routes';
import articleRoutes from './routes/article.routes';
import objectiveRoutes from './routes/objective.routes';
import minuteRoutes from './routes/minute.routes';
import userRoutes from './routes/user.routes';

// Load environment variables
dotenv.config();


// Connect to the database
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/objectives', objectiveRoutes);
app.use('/api/minutes', minuteRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, from the Ubuntu Nexus backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
