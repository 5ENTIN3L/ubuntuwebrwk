import { Request, Response, NextFunction } from 'express';
import { roles } from '../config/roles';
import Article, { IArticle } from '../models/Article';
import Objective, { IObjective } from '../models/Objective';
import CheckIn, { ICheckIn } from '../models/CheckIn';

// Type guards to check the type of a resource
function isArticle(resource: any): resource is IArticle {
  return resource.constructor === Article;
}

function isObjective(resource: any): resource is IObjective {
  return resource.constructor === Objective;
}

function isCheckIn(resource: any): resource is ICheckIn {
  return resource.constructor === CheckIn;
}

export const authorize = (requiredPermissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const userRole = req.user.role as keyof typeof roles;
    const userPermissions = roles[userRole]?.permissions || [];
    const userDepartment = req.user.department;

    // Admin-like override
    if (userPermissions.includes('manage_users')) {
      return next();
    }

    const resourceId = req.params.id || req.params.objectiveId || req.params.checkinId;
    let resource: IArticle | IObjective | ICheckIn | null = null;

    if (resourceId) {
      if (req.baseUrl.includes('/articles')) {
        resource = await Article.findById(resourceId);
      } else if (req.baseUrl.includes('/objectives')) {
        resource = await Objective.findById(resourceId);
      } else if (req.baseUrl.includes('/checkins')) {
        resource = await CheckIn.findById(resourceId);
      }
    }

    const hasPermission = requiredPermissions.every(permission => {
      // 1. Check for direct role-based permission
      if (userPermissions.includes(permission)) {
        return true;
      }

      // 2. Check for ownership-based permission (e.g., 'update_own_article')
      if (permission.includes('_own')) {
        if (resource) {
          let ownerId: string | undefined;
          if (isArticle(resource)) {
            ownerId = resource.author?.toString();
          } else if (isObjective(resource) || isCheckIn(resource)) {
            ownerId = resource.user?.toString();
          }
          
          if (ownerId === req.user._id.toString()) {
            return true;
          }
        }
      }

      // 3. Check for sharing-based permission
      if (resource && resource.sharedWith) {
        const share = resource.sharedWith.find(
          (s: any) => s.department === userDepartment
        );
        if (share) {
          // 'edit' permission implies 'read' permission
          if (share.permission === 'edit') {
            return true;
          }
          if (share.permission === 'read' && permission.startsWith('read_')) {
            return true;
          }
        }
      }

      return false;
    });

    if (hasPermission) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: You do not have the necessary permissions.' });
    }
  };
};

