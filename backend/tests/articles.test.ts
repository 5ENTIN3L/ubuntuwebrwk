import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import articleRoutes from '../src/routes/article.routes';
import authRoutes from '../src/routes/auth.routes';
import User from '../src/models/User';
import Article from '../src/models/Article';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);

let adminToken: string;
let staffToken: string;
let volunteerToken: string;
let adminUserId: mongoose.Types.ObjectId;
let staffUserId: mongoose.Types.ObjectId;

describe('Article Endpoints', () => {
  beforeEach(async () => {
    const mongoUri = 'mongodb://localhost:27017/ubuntu-nexus-test';
    await mongoose.connect(mongoUri);

    // Clear previous test data
    await User.deleteMany({});
    await Article.deleteMany({});

    // Register an admin user
    const adminRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        department: 'DOCT',
        role: 'admin',
      });
    adminToken = adminRes.body.token;
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) throw new Error('Admin user not found');
    adminUserId = adminUser._id as mongoose.Types.ObjectId;

    // Register a staff user
    const staffRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Staff User',
        email: 'staff@example.com',
        password: 'password123',
        department: 'Programs & Community Engagement',
        role: 'staff',
      });
    staffToken = staffRes.body.token;
    const staffUser = await User.findOne({ email: 'staff@example.com' });
    if (!staffUser) throw new Error('Staff user not found');
    staffUserId = staffUser._id as mongoose.Types.ObjectId;

    // Register a volunteer user
    const volunteerRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Volunteer User',
        email: 'volunteer@example.com',
        password: 'password123',
        department: 'Programs & Community Engagement',
        role: 'volunteer',
      });
    volunteerToken = volunteerRes.body.token;
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Article.deleteMany({});
    await mongoose.connection.close();
  });

  it('should allow staff to create an article', async () => {
    const res = await request(app)
      .post('/api/articles')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        title: 'Staff Article',
        content: 'Content by staff.',
        status: 'draft',
        department: 'Programs & Community Engagement',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Staff Article');
  });

  it('should not allow volunteer to create an article', async () => {
    const res = await request(app)
      .post('/api/articles')
      .set('Authorization', `Bearer ${volunteerToken}`)
      .send({
        title: 'Volunteer Article',
        content: 'Content by volunteer.',
        status: 'draft',
        department: 'Programs & Community Engagement',
      });
    expect(res.statusCode).toEqual(403);
  });

  it('should allow any authenticated user to get all articles', async () => {
    const res = await request(app)
      .get('/api/articles')
      .set('Authorization', `Bearer ${volunteerToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should allow staff to update their own article', async () => {
    const article = await Article.create({
      title: 'Original Staff Article',
      content: 'Original content.',
      author: staffUserId,
      status: 'draft',
      department: 'Programs & Community Engagement',
    });

    const res = await request(app)
      .put(`/api/articles/${article._id}`)
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        title: 'Updated Staff Article',
        content: 'Updated content by staff.',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Staff Article');
  });

  it('should not allow staff to update another staff member\'s article', async () => {
    const otherStaffRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Other Staff',
        email: 'otherstaff@example.com',
        password: 'password123',
        department: 'Research, Policy & Learning',
        role: 'staff',
      });
    const otherStaffToken = otherStaffRes.body.token;
    const otherStaffUser = await User.findOne({ email: 'otherstaff@example.com' });
    if (!otherStaffUser) throw new Error('Other staff user not found');
    const otherStaffUserId = otherStaffUser._id;

    const article = await Article.create({
      title: 'Article by Other Staff',
      content: 'Content by other staff.',
      author: otherStaffUserId,
      status: 'draft',
      department: 'Research, Policy & Learning',
    });

    const res = await request(app)
      .put(`/api/articles/${article._id}`)
      .set('Authorization', `Bearer ${staffToken}`) // Staff user trying to update other staff's article
      .send({
        title: 'Attempted Update',
      });
    expect(res.statusCode).toEqual(403);
  });

  it('should allow admin to delete any article', async () => {
    const article = await Article.create({
      title: 'Article to be deleted by Admin',
      content: 'Content.',
      author: staffUserId,
      status: 'draft',
      department: 'Programs & Community Engagement',
    });

    const res = await request(app)
      .delete(`/api/articles/${article._id}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Article removed');
  });

  it('should allow staff to share their own article', async () => {
    const article = await Article.create({
      title: 'Shareable Article',
      content: 'Content.',
      author: staffUserId,
      status: 'draft',
      department: 'Programs & Community Engagement',
    });

    const res = await request(app)
      .post(`/api/articles/${article._id}/share`)
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

  it('should allow a user from a shared department to read the article', async () => {
    const article = await Article.create({
      title: 'Article Shared with Research',
      content: 'Content.',
      author: staffUserId,
      status: 'published',
      department: 'Programs & Community Engagement',
      sharedWith: [{ department: 'Research, Policy & Learning', permission: 'read' }],
    });

    const researchStaffRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Research Staff',
        email: 'research@example.com',
        password: 'password123',
        department: 'Research, Policy & Learning',
        role: 'staff',
      });
    const researchStaffToken = researchStaffRes.body.token;

    const res = await request(app)
      .get(`/api/articles/${article._id}`)
      .set('Authorization', `Bearer ${researchStaffToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Article Shared with Research');
  });

  it('should not allow a user from a shared department with read permission to update the article', async () => {
    const article = await Article.create({
      title: 'Article Shared with Research for Read Only',
      content: 'Content.',
      author: staffUserId,
      status: 'published',
      department: 'Programs & Community Engagement',
      sharedWith: [{ department: 'Research, Policy & Learning', permission: 'read' }],
    });

    const researchStaffRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Research Staff 2',
        email: 'research2@example.com',
        password: 'password123',
        department: 'Research, Policy & Learning',
        role: 'staff',
      });
    const researchStaffToken = researchStaffRes.body.token;

    const res = await request(app)
      .put(`/api/articles/${article._id}`)
      .set('Authorization', `Bearer ${researchStaffToken}`)
      .send({
        title: 'Attempted Update by Research Staff',
      });
    expect(res.statusCode).toEqual(403);
  });
});
