import { Request, Response, NextFunction } from "express"
import IRequestWithUser from '../../interfaces/IRequestWithUser';

export default interface IMatchesController {
  getAll(req: Request, res: Response, next: NextFunction):void;
  create(req: IRequestWithUser, res: Response, next: NextFunction):void;
  updatedProgress(req: IRequestWithUser, res: Response, next: NextFunction):void;
}