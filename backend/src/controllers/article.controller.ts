import { Request, Response } from 'express';
import Article from '../models/Article';

// @desc    Create a new article
export const createArticle = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const { title, content, status, department } = req.body;
  const author = req.user._id;

  try {
    const article = new Article({
      title,
      content,
      author,
      status,
      department,
    });

    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all articles
export const getArticles = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  try {
    const userDepartment = req.user.department;
    const articles = await Article.find({
      $or: [
        { department: userDepartment },
        { 'sharedWith.department': userDepartment },
      ],
    }).populate('author', 'name');
    res.status(200).json(articles);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get a single article by ID
export const getArticle = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  try {
    const userDepartment = req.user.department;
    const article = await Article.findById(req.params.id).populate('author', 'name');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const isOwnerDepartment = article.department === userDepartment;
    const isSharedWithDepartment = article.sharedWith.some(
      share => share.department === userDepartment
    );

    if (!isOwnerDepartment && !isSharedWithDepartment) {
      return res.status(403).json({ message: 'User not authorized to view this article' });
    }

    res.status(200).json(article);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update an article
export const updateArticle = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const { title, content, status, department } = req.body;

  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check if the user is the author
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    article.title = title || article.title;
    article.content = content || article.content;
    article.status = status || article.status;
    article.department = department || article.department;

    const updatedArticle = await article.save();
    res.status(200).json(updatedArticle);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete an article
export const deleteArticle = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check if the user is the author
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await article.deleteOne();
    res.status(200).json({ message: 'Article removed' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Share an article with another department
export const shareArticle = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const { department, permission } = req.body;
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check if the user is the author
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Add the new share object to the sharedWith array
    article.sharedWith.push({ department, permission });
    const updatedArticle = await article.save();

    res.status(200).json(updatedArticle);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
