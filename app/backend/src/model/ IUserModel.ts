import IUserDTO from "src/dtos/IUserDTO";

export default abstract class IUserModel {
  abstract findOne(user: IUserDTO):Promise<IUserDTO | null>
}