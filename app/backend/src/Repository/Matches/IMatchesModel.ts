import IMatch from "../../interfaces/IMatche";

export default interface IMatchesModel {
  getAll():Promise<IMatch[]>
  getInProgress(inProgress: boolean):Promise<IMatch[]>
  create(match: IMatch):Promise<IMatch>
  updatedProgress(id: number):Promise<void>
  matchById(id:number):Promise<IMatch | null>
  updatedGoals(goals:object, id:number):Promise<IMatch | null>
}