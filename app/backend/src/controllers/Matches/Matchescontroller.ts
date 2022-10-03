import { Request, Response, NextFunction } from "express";
import IMatchesController from "./IMatchesController";
import IMatchesService from "../../services/Matches/IMatchesService";

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
}