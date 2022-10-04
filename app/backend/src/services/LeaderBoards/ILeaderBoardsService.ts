import ILeaderBoard from "../../interfaces/ILeaderBoard"

export default interface ILeaderBoardService {
  getAllHome():Promise<ILeaderBoard[]>

}