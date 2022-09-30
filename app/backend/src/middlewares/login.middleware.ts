import {Request, Response, NextFunction} from 'express'
import CustomError from '../helper/CustomError';
import LoginSchema from '../schemas/login.schema';

export default class LoginMiddleware {
  private schema: typeof LoginSchema;
  constructor() {
    this.schema = LoginSchema
  }

  validateLogin = (req:Request, res:Response, next:NextFunction) => {
    const { error } = this.schema.validate(req.body)
    if(error) {
      const [code, message] = error.message.split('|')
      return next(new CustomError(Number(code), message))
    }

    next();
  }
}