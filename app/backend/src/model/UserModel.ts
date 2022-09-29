import User from "src/database/models/User";
import IUserDTO from "src/dtos/IUserDTO";
import LoginDTO from "src/dtos/LoginDTO";
import IUserModel from "./ IUserModel";

export default class UserModel extends IUserModel{
  private model:User;

  async findOne(user: LoginDTO):Promise<IUserDTO | null>{
    const result = this.model.finOne({where: {user}})
    return result;
  }
}