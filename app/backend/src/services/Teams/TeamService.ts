import ITeam from "../../interfaces/ITeam";
import ITeamsService from "./ITeamService";
import ITeamsModel from "../../Repository/Teams/ITeamsModel";

export default class TeamsService implements ITeamsService {
  private model: ITeamsModel;

  constructor(model: ITeamsModel){
    this.model = model;
  }

  async getAll(): Promise<ITeam[]> {
    const result = await this.model.getAll()
    return result;
  }

}