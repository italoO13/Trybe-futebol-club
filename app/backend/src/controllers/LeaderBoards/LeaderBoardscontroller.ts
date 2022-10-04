import { Request, Response, NextFunction } from "express";
import IleaderBoardsController from "./ILeaderBoardsController";
import ILeaderBoardsService from "../../services/LeaderBoards/ILeaderBoardsService";

export default class MatchersController implements IleaderBoardsController {
  service: ILeaderBoardsService;
  constructor(service: ILeaderBoardsService){
    this.service = service;
  }
  getAllHome = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.service.getAllHome();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  getAllAway = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.service.getAllAway();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}