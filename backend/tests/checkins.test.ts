import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import objectiveRoutes from '../src/routes/objective.routes'; // Checkins are nested under objectives
import authRoutes from '../src/routes/auth.routes';
import User from '../src/models/User';
import Objective from '../src/models/Objective';
import CheckIn from '../src/models/CheckIn';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/objectives', objectiveRoutes);

let staffToken: string;
let staffUserId: mongoose.Types.ObjectId;
let staffObjectiveId: mongoose.Types.ObjectId;

describe('CheckIn Endpoints', () => {
  beforeAll(async () => {
    const mongoUri = 'mongodb://localhost:27017/ubuntu-nexus-test';
    await mongoose.connect(mongoUri);

    // Clear previous test data
    await User.deleteMany({});
    await Objective.deleteMany({});
    await CheckIn.deleteMany({});

    // Register a staff user
    const staffRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Staff User Checkin',
        email: 'staffcheckin@example.com',
        password: 'password123',
        department: 'Programs & Community Engagement',
        role: 'staff',
      });
    staffToken = staffRes.body.token;
    const staffUser = await User.findOne({ email: 'staffcheckin@example.com' });
    if (!staffUser) throw new Error('Staff user not found');
    staffUserId = staffUser._id as mongoose.Types.ObjectId;

    // Create an objective for the staff user
    const objectiveRes = await request(app)
      .post('/api/objectives')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        title: 'Staff Objective for Checkins',
        description: 'Description.',
        status: 'in-progress',
        dueDate: new Date(),
        department: 'Programs & Community Engagement',
      });
    staffObjectiveId = objectiveRes.body._id;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Objective.deleteMany({});
    await CheckIn.deleteMany({});
    await mongoose.connection.close();
  });

  it('should allow staff to create a check-in for their objective', async () => {
    const res = await request(app)
      .post(`/api/objectives/${staffObjectiveId}/checkins`)
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        notes: 'First check-in notes.',
        date: new Date(),
        department: 'Programs & Community Engagement',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('notes', 'First check-in notes.');
  });

  it('should allow staff to get all check-ins for their objective', async () => {
    const res = await request(app)
      .get(`/api/objectives/${staffObjectiveId}/checkins`)
      .set('Authorization', `Bearer ${staffToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('notes', 'First check-in notes.');
  });

  it('should allow staff to update their own check-in', async () => {
    const checkIn = await CheckIn.create({
      objective: staffObjectiveId,
      user: staffUserId,
      notes: 'Check-in to be updated.',
      date: new Date(),
      department: 'Programs & Community Engagement',
    });

    const res = await request(app)
      .put(`/api/objectives/${staffObjectiveId}/checkins/${checkIn._id}`)
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        notes: 'Updated check-in notes.',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('notes', 'Updated check-in notes.');
  });

  it('should allow staff to share their own check-in', async () => {
    const checkIn = await CheckIn.create({
      objective: staffObjectiveId,
      user: staffUserId,
      notes: 'Check-in to be shared.',
      date: new Date(),
      department: 'Programs & Community Engagement',
    });

    const res = await request(app)
      .post(`/api/objectives/${staffObjectiveId}/checkins/${checkIn._id}/share`)
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        department: 'Research, Policy & Learning',
        permission: 'read',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.sharedWith).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          department: 'Research, Policy & Learning',
          permission: 'read',
        }),
      ])
    );
  });

  it('should allow a user from a shared department to read the check-in', async () => {
    const checkIn = await CheckIn.create({
      objective: staffObjectiveId,
      user: staffUserId,
      notes: 'Check-in shared with Research.',
      date: new Date(),
      department: 'Programs & Community Engagement',
      sharedWith: [{ department: 'Research, Policy & Learning', permission: 'read' }],
    });

    const researchStaffRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Research Staff Checkin',
        email: 'researchcheckin@example.com',
        password: 'password123',
        department: 'Research, Policy & Learning',
        role: 'staff',
      });
    const researchStaffToken = researchStaffRes.body.token;

    const res = await request(app)
      .get(`/api/objectives/${staffObjectiveId}/checkins/${checkIn._id}`)
      .set('Authorization', `Bearer ${researchStaffToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('notes', 'Check-in shared with Research.');
  });

  it('should allow staff to delete their own check-in', async () => {
    const checkIn = await CheckIn.create({
      objective: staffObjectiveId,
      user: staffUserId,
      notes: 'Check-in to be deleted.',
      date: new Date(),
      department: 'Programs & Community Engagement',
    });

    const res = await request(app)
      .delete(`/api/objectives/${staffObjectiveId}/checkins/${checkIn._id}`)
      .set('Authorization', `Bearer ${staffToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Check-in removed');
  });
});

