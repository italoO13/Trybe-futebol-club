import IMatche from "../../interfaces/IMatche";
import IMatchesModel from "./IMatchesModel";
import Match from "../../database/models/Match";
import Team from "../../database/models/Team";

export default class MatchesModel implements IMatchesModel {
  model = Match;

  async getAll(): Promise<IMatche[]> {
    const result = await this.model.findAll({
      include: [
        {model: Team, as: 'teamhome', attributes: ['teamName'] },
        {model: Team, as: 'teamAway', attributes: ['teamName']}
      ]
    })
    return result;
  }

}