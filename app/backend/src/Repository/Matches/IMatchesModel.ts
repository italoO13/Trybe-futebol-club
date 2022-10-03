import IMatche from "../../interfaces/IMatche";

export default interface IMatchesModel {
  getAll():Promise<IMatche[]>
}