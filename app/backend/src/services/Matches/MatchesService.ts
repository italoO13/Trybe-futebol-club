import IMatch from "../../interfaces/IMatche";
import IMatchesService from "./IMatchesService";
import IMatchesModel from "../../Repository/Matches/IMatchesModel";

export default class MatchesService implements IMatchesService {
  private model: IMatchesModel;

  constructor(model: IMatchesModel){
    this.model = model;
  }
  
  async getAll(inProgress: string | null): Promise<IMatch[]> {  
    if(!inProgress) {
      return await this.model.getAll()
    }
    return await this.model.getInProgress(inProgress==='true' ? true: false)
  }
  
  async create(match: IMatch): Promise<IMatch> {
    const result = await this.model.create(match);
    return result;
  }
}