import { Router } from 'express';
import {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  shareArticle,
} from '../controllers/article.controller';
import { protect } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorization.middleware';

const router = Router();

// @route   POST /api/articles
// @desc    Create a new article
// @access  Private (staff, executive, admin)
router.post('/', protect, authorize(['create_article']), createArticle);

// @route   GET /api/articles
// @desc    Get all articles
// @access  Private (all authenticated users)
router.get('/', protect, authorize(['read_articles']), getArticles);

// @route   GET /api/articles/:id
// @desc    Get a single article by ID
// @access  Private (all authenticated users)
router.get('/:id', protect, authorize(['read_articles']), getArticle);

// @route   PUT /api/articles/:id
// @desc    Update an article
// @access  Private (staff, executive, admin)
router.put('/:id', protect, authorize(['update_own_article', 'update_any_article']), updateArticle);

// @route   DELETE /api/articles/:id
// @desc    Delete an article
// @access  Private (executive, admin)
router.delete('/:id', protect, authorize(['delete_any_article']), deleteArticle);

// @route   POST /api/articles/:id/share
// @desc    Share an article with another department
// @access  Private (author of the article)
router.post('/:id/share', protect, authorize(['update_own_article']), shareArticle);

export default router;
