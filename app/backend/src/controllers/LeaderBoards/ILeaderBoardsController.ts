import { Request, Response, NextFunction } from "express"

export default interface IleaderBoardsController {
  getAllHome(req: Request, res: Response, next: NextFunction):void;

}