import User from "../database/models/User";
import IUser from "../interfaces/IUser";
import ILoginModel from "./ILoginModel";

export default class LoginModel implements ILoginModel{
  model= User;

  async findOne(email: string):Promise<IUser | null>{
    const result = await this.model.findOne({where: {email}})
    return result;
  }
}