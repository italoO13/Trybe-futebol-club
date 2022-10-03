import IMatche from "../../interfaces/IMatche";

export default interface IMatchesService {
  getAll():Promise<IMatche[]>
}