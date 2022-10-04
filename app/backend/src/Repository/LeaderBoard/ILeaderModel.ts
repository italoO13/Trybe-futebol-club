import ILeaderBoard from "../../interfaces/ILeaderBoard"

export default interface ILeaderBoardModel {
  getAllHome():Promise<ILeaderBoard[]>
}