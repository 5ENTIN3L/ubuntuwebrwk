import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import minuteRoutes from '../src/routes/minute.routes';
import authRoutes from '../src/routes/auth.routes';
import User from '../src/models/User';
import Minute from '../src/models/Minute';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/minutes', minuteRoutes);

let executiveToken: string;
let staffToken: string;
let executiveUserId: mongoose.Types.ObjectId;
let staffUserId: mongoose.Types.ObjectId; // Declare staffUserId here

describe('Minute Endpoints', () => {
  beforeAll(async () => {
    const mongoUri = 'mongodb://localhost:27017/ubuntu-nexus-test';
    await mongoose.connect(mongoUri);

    // Clear previous test data
    await User.deleteMany({});
    await Minute.deleteMany({});

    // Register an executive user
    const executiveRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Executive User',
        email: 'executive@example.com',
        password: 'password123',
        department: 'Operations & Administration',
        role: 'executive',
      });
    executiveToken = executiveRes.body.token;
    const executiveUser = await User.findOne({ email: 'executive@example.com' });
    if (!executiveUser) throw new Error('Executive user not found');
    executiveUserId = executiveUser._id as mongoose.Types.ObjectId;

    // Register a staff user
    const staffRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Staff User Minute',
        email: 'staffminute@example.com',
        password: 'password123',
        department: 'Programs & Community Engagement',
        role: 'staff',
      });
    staffToken = staffRes.body.token;
    const staffUser = await User.findOne({ email: 'staffminute@example.com' });
    if (!staffUser) throw new Error('Staff user not found');
    staffUserId = staffUser._id as mongoose.Types.ObjectId;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Minute.deleteMany({});
    await mongoose.connection.close();
  });

  it('should allow executive to create minutes', async () => {
    const res = await request(app)
      .post('/api/minutes')
      .set('Authorization', `Bearer ${executiveToken}`)
      .send({
        title: 'Executive Meeting Minutes',
        date: new Date(),
        attendees: [executiveUserId],
        content: 'Meeting discussed Q1 strategy.',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Executive Meeting Minutes');
  });

  it('should not allow staff to create minutes', async () => {
    const res = await request(app)
      .post('/api/minutes')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        title: 'Staff Meeting Minutes',
        date: new Date(),
        attendees: [staffUserId],
        content: 'Staff meeting notes.',
      });
    expect(res.statusCode).toEqual(403);
  });

  it('should allow executive to get all minutes', async () => {
    await Minute.create({
      title: 'Another Executive Meeting',
      date: new Date(),
      attendees: [executiveUserId],
      content: 'More discussions.',
      author: executiveUserId,
    });

    const res = await request(app)
      .get('/api/minutes')
      .set('Authorization', `Bearer ${executiveToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('title');
  });

  it('should allow executive to update minutes', async () => {
    const minute = await Minute.create({
      title: 'Minutes to Update',
      date: new Date(),
      attendees: [executiveUserId],
      content: 'Initial content.',
      author: executiveUserId,
    });

    const res = await request(app)
      .put(`/api/minutes/${minute._id}`)
      .set('Authorization', `Bearer ${executiveToken}`)
      .send({
        title: 'Updated Minutes Title',
        content: 'Updated content.',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Minutes Title');
  });

  it('should allow executive to delete minutes', async () => {
    const minute = await Minute.create({
      title: 'Minutes to Delete',
      date: new Date(),
      attendees: [executiveUserId],
      content: 'Content to be deleted.',
      author: executiveUserId,
    });

    const res = await request(app)
      .delete(`/api/minutes/${minute._id}`)
      .set('Authorization', `Bearer ${executiveToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Minutes removed');
  });
});

