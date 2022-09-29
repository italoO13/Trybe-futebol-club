import LoginDTO from "./LoginDTO";

export default interface IUserDTO extends LoginDTO {
  id?:number;
  username:string;
  role:string;
}