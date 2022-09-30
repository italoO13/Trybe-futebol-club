import { Request } from "express";
import IJWT from "./IAuth";

export default interface IRequestWithUser extends Request {
  user?: IJWT
}