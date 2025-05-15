import { Multer } from 'multer';
import { IUser } from './user';

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
      userImagePath?: string;
      user?: IUser;
    }
  }
}