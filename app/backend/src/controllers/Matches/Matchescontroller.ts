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
      const response = await this.service.getAll();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}