import {Request, Response, NextFunction} from 'express';

export default interface ITeamsController {
  getAll(req:Request, res:Response, next:NextFunction):Promise<void>
}