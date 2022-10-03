import IMatch from "../../interfaces/IMatche";

export default interface IMatchesService {
  getAll(inProgress: string | null):Promise<IMatch[]>
}