import ITeam from "../../interfaces/ITeam";
import ITeamsService from "./ITeamService";
import ITeamsModel from "../../Repository/Teams/ITeamsModel";
import CustomError from "../../helper/CustomError";

export default class TeamsService implements ITeamsService {
  private model: ITeamsModel;

  constructor(model: ITeamsModel){
    this.model = model;
  }

  async getById(id: number): Promise<ITeam> {
    const result = await this.model.getById(id);
    if(!result) {
      throw new CustomError(400, 'Team not found')
    }
    return result;
  }

  async getAll(): Promise<ITeam[]> {
    const result = await this.model.getAll()
    return result;
  }

}