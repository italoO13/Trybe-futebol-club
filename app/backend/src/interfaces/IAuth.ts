import { JwtPayload } from "jsonwebtoken";

export default interface IJWT extends JwtPayload {
  id:number,
  role: string,
  email?:string,
}