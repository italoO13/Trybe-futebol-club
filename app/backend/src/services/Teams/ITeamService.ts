import ITeam from "../../interfaces/ITeam";

export default interface ITeamsService {
  getAll():Promise<ITeam[]>
  getById(id:number):Promise<ITeam>
}