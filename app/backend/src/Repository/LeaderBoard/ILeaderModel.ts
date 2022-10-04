import ILeaderBoard from "../../interfaces/ILeaderBoard"

export default interface ILeaderBoardModel {
  getAllHome():Promise<ILeaderBoard[]>
  getAllAway():Promise<ILeaderBoard[]>
  getAll():Promise<ILeaderBoard[]>
}