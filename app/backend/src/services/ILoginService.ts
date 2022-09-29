import ILogin from '../interfaces/ILogin';

export default interface ILoginService {
  createSession({email, password}: ILogin):Promise<string>
}