import ITeam from "../../interfaces/ITeam";
import ITeamsModel from "./ITeamsModel";
import Team from "../../database/models/Team";

export default class TeamsModel implements ITeamsModel {
  model = Team;

  async getAll(): Promise<ITeam[]> {
    const result = await this.model.findAll()
    return result;
  }

}