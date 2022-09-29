import { Response, Request, NextFunction } from 'express';
import ILoginService from '../services/ILoginService';
import ILoginController from './ILoginController';

export default class LoginController implements ILoginController {
  private service: ILoginService;

  constructor(service:ILoginService) {
    this.service = service;
  }

  createSession = async(req: Request, res:Response, next:NextFunction) => {
    try {
      const {email, password} = req.body;
      const result = await this.service.createSession({email, password})
      res.status(200).json({token: result})
    } catch (error) {
      next(error);
    }
  }
}