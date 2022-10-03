import IMatcher from "../../interfaces/IMatche";
import IMatchesService from "./IMatchesService";
import IMatchesModel from "../../Repository/Matches/IMatchesModel";

export default class MatchesService implements IMatchesService {
  private model: IMatchesModel;

  constructor(model: IMatchesModel){
    this.model = model;
  }

  async getAll(): Promise<IMatcher[]> {
    const result = await this.model.getAll()
    return result;
  }

}