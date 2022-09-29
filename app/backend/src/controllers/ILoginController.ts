import { Response, Request, NextFunction } from 'express';

export default interface ILoginController {
  createSession(req:Request, res:Response, next: NextFunction):void
}