import IMatch from "../../interfaces/IMatche";
import IMatchesModel from "./IMatchesModel";
import Match from "../../database/models/Match";
import Team from "../../database/models/Team";

export default class MatchesModel implements IMatchesModel {
  model = Match;

  async getAll(): Promise<IMatch[]> {
    const result = await this.model.findAll({
      include: [
        {model: Team, as: 'teamHome', attributes: ['teamName'] },
        {model: Team, as: 'teamAway', attributes: ['teamName']}
      ]
    })
    return result;
  }

  async getInProgress(inProgress: boolean): Promise<IMatch[]> {
    const result = await this.model.findAll({
      include: [
        {model: Team, as: 'teamHome', attributes: ['teamName'] },
        {model: Team, as: 'teamAway', attributes: ['teamName']}
      ],
      where: {
        inProgress
      }
    })

    return result;
  }

}