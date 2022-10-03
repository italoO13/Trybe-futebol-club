import IMatch from "../../interfaces/IMatche";

export default interface IMatchesService {
  getAll(inProgress: string | null):Promise<IMatch[]>
  create(match: IMatch):Promise<IMatch>
  updatedProgress(id:number):Promise<void>
}