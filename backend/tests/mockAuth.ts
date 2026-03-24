
import { IUser } from '../src/models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const mockAuth = (req: any, res: any, next: any) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (token === 'test-admin-token') {
            req.user = {
                _id: '60f8d5b5d8e8a3a7d8b8b8b8',
                role: 'admin',
                name: 'Admin User',
                email: 'admin@test.com',
                department: 'DOCT'
            } as IUser;
        } else if (token === 'test-user-token') {
            req.user = {
                _id: '60f8d5b5d8e8a3a7d8b8b8b9',
                role: 'staff',
                name: 'Test User',
                email: 'test@test.com',
                department: 'DOCT'
            } as IUser;
        } else if (token === 'test-executive-token') {
            req.user = {
                _id: '60f8d5b5d8e8a3a7d8b8b8ba',
                role: 'executive',
                name: 'Executive User',
                email: 'executive@test.com',
                department: 'Operations & Administration'
            } as IUser;
        }
    }
    next();
};
