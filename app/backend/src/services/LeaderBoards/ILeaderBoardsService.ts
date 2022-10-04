import ILeaderBoard from "../../interfaces/ILeaderBoard"

export default interface ILeaderBoardService {
  getAllHome():Promise<ILeaderBoard[]>
  getAllAway():Promise<ILeaderBoard[]>
  getAll():Promise<ILeaderBoard[]>
}