
import request from 'supertest';

import express from 'express';

import mongoose from 'mongoose';

import dotenv from 'dotenv';

import authRoutes from '../src/routes/auth.routes';

import userRoutes from '../src/routes/user.routes';

import User from '../src/models/User';

import LoginHistory from '../src/models/LoginHistory';

import { protect } from '../src/middleware/auth.middleware';

import { authorize } from '../src/middleware/authorization.middleware';



dotenv.config();



const app = express();

app.use(express.json());



app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);







describe('Login History Endpoints', () => {

  let adminToken: string;

  let userToken: string;

  let userId: string;



  beforeAll(async () => {

    const mongoUri = 'mongodb://localhost:27017/ubuntu-nexus-test-history';

    await mongoose.connect(mongoUri);



    // Create a user and an admin for testing

    const user = await new User({

        name: 'Test User History',

        email: 'testhistory@example.com',

        password: 'password123',

        department: 'DOCT',

        role: 'staff',

    }).save();

    userId = user._id.toString();



    const admin = await new User({

        name: 'Admin User History',

        email: 'adminhistory@example.com',

        password: 'password123',

        department: 'DOCT',

        role: 'admin',

    }).save();



    // Log in to get tokens

    const userRes = await request(app)

      .post('/api/auth/login')

      .send({ email: 'testhistory@example.com', password: 'password123' });

    userToken = userRes.body.token;



    const adminRes = await request(app)

      .post('/api/auth/login')

      .send({ email: 'adminhistory@example.com', password: 'password123' });

    adminToken = adminRes.body.token;

  });



  afterAll(async () => {

    await User.deleteMany({});

    await LoginHistory.deleteMany({});

    await mongoose.connection.close();

  });



  it('should record login history on successful login', async () => {

    const loginHistoryCount = await LoginHistory.countDocuments({ user: userId });

    expect(loginHistoryCount).toBe(1);

  });



  it('should get login history for the currently authenticated user', async () => {

    const res = await request(app)

      .get('/api/auth/login-history')

      .set('Authorization', `Bearer ${userToken}`);



    expect(res.statusCode).toEqual(200);

    expect(Array.isArray(res.body)).toBe(true);

    expect(res.body.length).toBe(1);

    expect(res.body[0]).toHaveProperty('ipAddress');

    expect(res.body[0]).toHaveProperty('userAgent');

  });



  it('should get login history for a specific user as an admin', async () => {

    const res = await request(app)

      .get(`/api/users/${userId}/login-history`)

      .set('Authorization', `Bearer ${adminToken}`);



    expect(res.statusCode).toEqual(200);

    expect(Array.isArray(res.body)).toBe(true);

    expect(res.body.length).toBe(1);

  });



  it('should not get login history for a specific user as a non-admin', async () => {

    const res = await request(app)

      .get(`/api/users/${userId}/login-history`)

      .set('Authorization', `Bearer ${userToken}`);



    expect(res.statusCode).toEqual(403);

  });

});
