import ITeamsController from "./ITeamsController";
import ITeamsService from "../../services/Teams/ITeamService";
import {Request, Response, NextFunction} from 'express';

export default class TeamsController implements ITeamsController {
  private service : ITeamsService;
  constructor(service: ITeamsService){
    this.service = service;
  }

  getById = async(req: Request, res: Response, next: NextFunction): Promise<void>  => {
    try {
      const {id} = req.params;
      const result = await this.service.getById(Number(id));
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  getAll = async(req: Request, res: Response, next: NextFunction): Promise<void>  => {
    try {
      const result = await this.service.getAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}