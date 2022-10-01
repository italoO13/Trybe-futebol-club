import ITeam from "../../interfaces/ITeam";

export default interface ITeamsModel {
  getAll():Promise<ITeam[]>
}