import ILeaderBoard from "../../interfaces/ILeaderBoard";
import ILeaderBoardModel from "./ILeaderModel";
import Match from "../../database/models/Match";
import Team from "../../database/models/Team";
import HelperLeaderBoard from '../../helper/Leaderboards';
import CustomError from "../../helper/CustomError";

export default class MatchesModel implements ILeaderBoardModel {
  modelMatch = Match;
  modelTeam = Team;

  async getAllHome(): Promise<ILeaderBoard[]> {
    const match = await this.modelMatch.findAll({
      include: [
        {model: Team, as: 'teamHome', attributes: ['teamName'] },
        {model: Team, as: 'teamAway', attributes: ['teamName']}
      ],
      where: {
        inProgress: false,
      }
    })
    const team = await this.modelTeam.findAll();
    const helper = new HelperLeaderBoard();
    return helper.getHome(team, match);
  }

  async getAllAway(): Promise<ILeaderBoard[]> {
    const match = await this.modelMatch.findAll({
      include: [
        {model: Team, as: 'teamHome', attributes: ['teamName'] },
        {model: Team, as: 'teamAway', attributes: ['teamName']}
      ],
      where: {
        inProgress: false,
      }
    })
    const team = await this.modelTeam.findAll();
    const helper = new HelperLeaderBoard();
    return helper.getAway(team, match);
  }

  async getAll(): Promise<ILeaderBoard[]> {
    const match = await this.modelMatch.findAll({
      include: [
        {model: Team, as: 'teamHome', attributes: ['teamName'] },
        {model: Team, as: 'teamAway', attributes: ['teamName']}
      ],
      where: {
        inProgress: false,
      }
    })
    const team = await this.modelTeam.findAll();
    const helper = new HelperLeaderBoard();
    return helper.getAll(team, match);
  }

}