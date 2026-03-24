import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from '../src/routes/auth.routes';
import User from '../src/models/User';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    // Connect to a test database
    const mongoUri = 'mongodb://localhost:27017/ubuntu-nexus-test';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    // Clean up the test database and close the connection
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        department: 'DOCT',
        role: 'staff',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should not register a user with an existing email', async () => {
    await User.deleteMany({});
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User 2',
        email: 'test2@example.com',
        password: 'password123',
        department: 'DOCT',
        role: 'staff',
      });
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User 3',
        email: 'test2@example.com',
        password: 'password123',
        department: 'DOCT',
        role: 'staff',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'User already exists');
  });

  it('should log in an existing user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Login User',
        email: 'login@example.com',
        password: 'password123',
        department: 'DOCT',
        role: 'staff',
      });
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not log in with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});
