import ITeam from "../../interfaces/ITeam";

export default interface ITeamsModel {
  getAll():Promise<ITeam[]>
  getById(id:number):Promise<ITeam | null>
}