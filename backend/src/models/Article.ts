import { Schema, model, Document, Types } from 'mongoose';

const departmentEnum = [
  'Programs & Community Engagement',
  'Research, Policy & Learning',
  'Partnerships & Resource Mobilization',
  'Operations & Administration',
  'DOCT',
  'Social Media, Communications & Branding',
] as const;

// Interface to define the Article document type
export interface IArticle extends Document {
  title: string;
  content: string;
  author: Types.ObjectId; // Reference to the User who created the article
  department: (typeof departmentEnum)[number];
  sharedWith: {
    department: (typeof departmentEnum)[number];
    permission: 'read' | 'edit';
  }[];
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

// Define the Article schema
const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required.'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required.'],
      enum: departmentEnum,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    sharedWith: [
      {
        department: {
          type: String,
          required: true,
          enum: departmentEnum,
        },
        permission: {
          type: String,
          required: true,
          enum: ['read', 'edit'],
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Article model
const Article = model<IArticle>('Article', ArticleSchema);

export default Article;
