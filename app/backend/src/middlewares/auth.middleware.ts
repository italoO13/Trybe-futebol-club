import AuthJWT from "../helper/Auth";
import { Response, NextFunction } from "express";
import CustomError from "../helper/CustomError";
import IRequestWithUser from "../interfaces/IRequestWithUser";

export default class Auth {
  constructor(private auth= new AuthJWT()){}

  public authUser = (req: IRequestWithUser, res: Response, next: NextFunction) => {
    const {authorization} = req.headers
    if(!authorization) {
      throw new CustomError(401, 'Token not found')
    }
    try {
      const decode = this.auth.veriryToken(authorization);
      req.user = decode;
      next()
    } catch (error) {
      next(new CustomError(401, 'Invalid Token'));
    }
  }
}