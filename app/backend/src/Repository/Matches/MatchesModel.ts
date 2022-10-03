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

  private async validatedTeams(match:IMatch):Promise<void> {
    const homeTeam = await this.matchById(match.homeTeam);
    const awayTeam = await this.matchById(match.awayTeam);
    if(!homeTeam || !awayTeam) {
      throw new CustomError(404, "There is no team with such id!")
    }

    if(match.homeTeam === match.awayTeam) {
      throw new CustomError(401, "It is not possible to create a match with two equal teams")
    }
  }

  async create(match: IMatch): Promise<IMatch> {
    await this.validatedTeams(match);
    const result = await this.model.create(match);
    return result;
  }

  async updatedProgress(idMatch: number):Promise<void> {
    await this.model.update(
      {'inProgress': false},
      {where: {'id': idMatch}}
    )
  }

  async matchById(id:number):Promise<IMatch | null> {
    return await this.model.findByPk(id);
  }

}