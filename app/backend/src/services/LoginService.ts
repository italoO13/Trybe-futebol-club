import ILoginService from "./ILoginService";
import ILoginModel from "../Repository/ILoginModel";
import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';
import * as Bycrpt from '../helper/Bcrypt';
import AuthJWT from "../helper/Auth";

export default class LoginService implements ILoginService {
  private model: ILoginModel
  private auth: AuthJWT;
  constructor(userModel: ILoginModel){
    this.model = userModel;
    this.auth = new AuthJWT();
  }


  private async verifyUser(email:string, password:string ):Promise<IUser> {
    const response = await this.model.findOne(email);

    if(!response) {
      throw new Error('Não encontrado!');
    }

    const statusPassword = Bycrpt.verifyPassword(response.password, password)

    if(!statusPassword) {
      throw new Error('Não encontrado!');
    }

    return response;

  }

  async createSession({ email, password }: ILogin): Promise<string> {
    const response = await this.verifyUser(email, password);
    const token = this.auth.generateToken({
      id: response.id,
      email: response.email
    })
    return token;
  }
}