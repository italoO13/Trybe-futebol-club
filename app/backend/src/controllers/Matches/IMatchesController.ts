import { Request, Response, NextFunction } from "express"

export default interface IMatchesController {
  getAll(req: Request, res: Response, next: NextFunction):void;
}