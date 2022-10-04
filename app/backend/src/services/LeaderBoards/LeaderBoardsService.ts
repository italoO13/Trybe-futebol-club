import ILeaderBoard from "../../interfaces/ILeaderBoard";
import ILeaderBoardModel from "../../Repository/LeaderBoard/ILeaderModel";
import ILeaderBoardService from './ILeaderBoardsService';

export default class MatchesService implements ILeaderBoardService {
  private model: ILeaderBoardModel;

  constructor(model: ILeaderBoardModel){
    this.model = model;
  }
  
  async getAllHome(): Promise<ILeaderBoard[]> {  
    const result = await this.model.getAllHome();
    return result;
  }

  async getAllAway(): Promise<ILeaderBoard[]> {
    const result = await this.model.getAllAway();
    return result;
  }
}