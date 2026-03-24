import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import objectiveRoutes from '../src/routes/objective.routes';
import authRoutes from '../src/routes/auth.routes';
import User from '../src/models/User';
import Objective from '../src/models/Objective';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/objectives', objectiveRoutes);

let adminToken: string;
let staffToken: string;
let volunteerToken: string;
let adminUserId: mongoose.Types.ObjectId;
let staffUserId: mongoose.Types.ObjectId;

describe('Objective Endpoints', () => {
  beforeAll(async () => {
    const mongoUri = 'mongodb://localhost:27017/ubuntu-nexus-test';
    await mongoose.connect(mongoUri);

    // Clear previous test data
    await User.deleteMany({});
    await Objective.deleteMany({});

    // Register an admin user
    const adminRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Admin User Obj',
        email: 'adminobj@example.com',
        password: 'password123',
        department: 'DOCT',
        role: 'admin',
      });
    adminToken = adminRes.body.token;
    const adminUser = await User.findOne({ email: 'adminobj@example.com' });
    if (!adminUser) throw new Error('Admin user not found');
    adminUserId = adminUser._id as mongoose.Types.ObjectId;

    // Register a staff user
    const staffRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Staff User Obj',
        email: 'staffobj@example.com',
        password: 'password123',
        department: 'Programs & Community Engagement',
        role: 'staff',
      });
    staffToken = staffRes.body.token;
    const staffUser = await User.findOne({ email: 'staffobj@example.com' });
    if (!staffUser) throw new Error('Staff user not found');
    staffUserId = staffUser._id as mongoose.Types.ObjectId;

    // Register a volunteer user
    const volunteerRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Volunteer User Obj',
        email: 'volunteerobj@example.com',
        password: 'password123',
        department: 'Programs & Community Engagement',
        role: 'volunteer',
      });
    volunteerToken = volunteerRes.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Objective.deleteMany({});
    await mongoose.connection.close();
  });

  it('should allow staff to create an objective', async () => {
    const res = await request(app)
      .post('/api/objectives')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        title: 'Staff Objective',
        description: 'Description by staff.',
        status: 'in-progress',
        dueDate: new Date(),
        department: 'Programs & Community Engagement',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Staff Objective');
  });

  it('should not allow volunteer to create an objective', async () => {
    const res = await request(app)
      .post('/api/objectives')
      .set('Authorization', `Bearer ${volunteerToken}`)
      .send({
        title: 'Volunteer Objective',
        description: 'Description by volunteer.',
        status: 'not-started',
        dueDate: new Date(),
        department: 'Programs & Community Engagement',
      });
    expect(res.statusCode).toEqual(403);
  });

  it('should allow staff to get their own objectives', async () => {
    await Objective.create({
      title: 'My Staff Objective',
      description: 'My description.',
      user: staffUserId,
      status: 'completed',
      dueDate: new Date(),
      department: 'Programs & Community Engagement',
    });

    const res = await request(app)
      .get('/api/objectives')
      .set('Authorization', `Bearer ${staffToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('title', 'My Staff Objective');
  });

  it('should allow staff to update their own objective', async () => {
    const objective = await Objective.create({
      title: 'Original Staff Objective',
      description: 'Original description.',
      user: staffUserId,
      status: 'in-progress',
      dueDate: new Date(),
      department: 'Programs & Community Engagement',
    });

    const res = await request(app)
      .put(`/api/objectives/${objective._id}`)
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        title: 'Updated Staff Objective',
        status: 'completed',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Staff Objective');
    expect(res.body).toHaveProperty('status', 'completed');
  });

  it('should not allow staff to update another staff member\'s objective', async () => {
    const otherStaffRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Other Staff Obj',
        email: 'otherstaffobj@example.com',
        password: 'password123',
        department: 'Research, Policy & Learning',
        role: 'staff',
      });
    const otherStaffToken = otherStaffRes.body.token;
    const otherStaffUser = await User.findOne({ email: 'otherstaffobj@example.com' });
    if (!otherStaffUser) throw new Error('Other staff user not found');
    const otherStaffUserId = otherStaffUser._id;


    const objective = await Objective.create({
      title: 'Objective by Other Staff',
      description: 'Description by other staff.',
      user: otherStaffUserId,
      status: 'not-started',
      dueDate: new Date(),
      department: 'Research, Policy & Learning',
    });

    const res = await request(app)
      .put(`/api/objectives/${objective._id}`)
      .set('Authorization', `Bearer ${staffToken}`) // Staff user trying to update other staff's objective
      .send({
        title: 'Attempted Update',
      });
    expect(res.statusCode).toEqual(403);
  });

  it('should allow admin to delete any objective', async () => {
    const objective = await Objective.create({
      title: 'Objective to be deleted by Admin',
      description: 'Description.',
      user: staffUserId,
      status: 'in-progress',
      dueDate: new Date(),
      department: 'Programs & Community Engagement',
    });

    const res = await request(app)
      .delete(`/api/objectives/${objective._id}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Objective removed');
  });

  it('should allow staff to share their own objective', async () => {
    const objective = await Objective.create({
      title: 'Shareable Objective',
      description: 'Description.',
      user: staffUserId,
      status: 'in-progress',
      dueDate: new Date(),
      department: 'Programs & Community Engagement',
    });

    const res = await request(app)
      .post(`/api/objectives/${objective._id}/share`)
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

  it('should allow a user from a shared department to read the objective', async () => {
    const objective = await Objective.create({
      title: 'Objective Shared with Research',
      description: 'Description.',
      user: staffUserId,
      status: 'completed',
      dueDate: new Date(),
      department: 'Programs & Community Engagement',
      sharedWith: [{ department: 'Research, Policy & Learning', permission: 'read' }],
    });

    const researchStaffRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Research Staff Obj',
        email: 'researchobj@example.com',
        password: 'password123',
        department: 'Research, Policy & Learning',
        role: 'staff',
      });
    const researchStaffToken = researchStaffRes.body.token;

    const res = await request(app)
      .get(`/api/objectives/${objective._id}`)
      .set('Authorization', `Bearer ${researchStaffToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Objective Shared with Research');
  });

  it('should not allow a user from a shared department with read permission to update the objective', async () => {
    const objective = await Objective.create({
      title: 'Objective Shared with Research for Read Only',
      description: 'Description.',
      user: staffUserId,
      status: 'completed',
      dueDate: new Date(),
      department: 'Programs & Community Engagement',
      sharedWith: [{ department: 'Research, Policy & Learning', permission: 'read' }],
    });

    const researchStaffRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Research Staff Obj 2',
        email: 'researchobj2@example.com',
        password: 'password123',
        department: 'Research, Policy & Learning',
        role: 'staff',
      });
    const researchStaffToken = researchStaffRes.body.token;

    const res = await request(app)
      .put(`/api/objectives/${objective._id}`)
      .set('Authorization', `Bearer ${researchStaffToken}`)
      .send({
        title: 'Attempted Update by Research Staff',
      });
    expect(res.statusCode).toEqual(403);
  });
});

