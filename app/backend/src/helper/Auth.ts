import * as jwt from "jsonwebtoken";
import IJWT from "../interfaces/IAuth";


export default class AuthJWT {
  private config: jwt.SignOptions;
  private secret: jwt.Secret;

  constructor() {
    this.config = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    this.secret = process.env.JWT_SECRET || 'secret';
  }

  generateToken (payload:object):string {
    const token = jwt.sign(
    {...payload}, this.secret,
    {expiresIn: this.config.expiresIn, algorithm:this.config.algorithm}
    )
    return token;
  }

  veriryToken(token:string) {
    return jwt.verify(token,this.secret) as IJWT
  }
}