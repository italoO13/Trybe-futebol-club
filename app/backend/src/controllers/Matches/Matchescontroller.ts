import { Request, Response, NextFunction } from "express";
import IMatchesController from "./IMatchesController";
import IMatchesService from "../../services/Matches/IMatchesService";
import IRequestWithUser from "../../interfaces/IRequestWithUser";

export default class MatchersController implements IMatchesController {
  service: IMatchesService;
  constructor(service: IMatchesService){
    this.service = service;
  }
  getAll = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const {inProgress} = req.query;
      const response = await this.service.getAll(inProgress as string | null);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  create = async (req: IRequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => {
    try {
      const response = await this.service.create(req.body);
      console.log('match',response);
      res.status(201).json(response)
    } catch (error) {
     next(error) 
    }
  }

  updatedProgress = async(req: IRequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => {
    try {
      const {id} = req.params;
      await this.service.updatedProgress(Number(id))
      res.status(200).json({ "message": "Finished" })
    } catch (error) {
      next(error);
    }
  }
}