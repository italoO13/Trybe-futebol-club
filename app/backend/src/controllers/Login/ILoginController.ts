import { Response, Request, NextFunction } from 'express';
import IRequestWithUser from '../../interfaces/IRequestWithUser';

export default interface ILoginController {
  createSession(req:Request, res:Response, next: NextFunction):void;
  validateAuthorization(req:IRequestWithUser, res:Response, next: NextFunction):void
}