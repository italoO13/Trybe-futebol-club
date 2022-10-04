import ITeam from '../interfaces/ITeam';
import IMatches from '../interfaces/IMatche'
import ILeaderBoard from '../interfaces/ILeaderBoard';

export default class Leaderboards {
  public leaderboard: ILeaderBoard[] = [];
  public homeLeaderBoard: ILeaderBoard[] = [];
  public awayLeaderBoard: ILeaderBoard[] = [];
  private obj: ILeaderBoard = {
      name: '',
      totalGames: 0,
      totalVictories:0,
      totalPoints: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance:0,
      efficiency: 0,
  }
  constructor() {}

  public getHome(teams:ITeam[], matches: IMatches[]) {
    teams.forEach((team:ITeam) => {
      this.homeLeaderBoard.push(this.home(team, matches))
    })
    return this.homeLeaderBoard.sort(this.order);
  }

  public getAway(teams:ITeam[], matches: IMatches[]) {
    teams.forEach((team:ITeam) => {
      this.awayLeaderBoard.push(this.outside(team, matches))
    })
    return this.awayLeaderBoard.sort(this.order);
  }

  public getAll(teams:ITeam[], matches: IMatches[]) {
    teams.forEach((team:ITeam) => {
      this.leaderboard.push(this.totalMatches(team, matches))
    })
    return this.leaderboard.sort(this.order)
  }

  private order(board1:ILeaderBoard, board2:ILeaderBoard){
    if(board2.totalPoints > board1.totalPoints) {
      return 1;
    }
    if(board2.totalPoints< board1.totalPoints) {
      return -1;
    }
    if(board2.totalVictories > board1.totalVictories) {
      return 1;
    }
    if(board2.totalVictories< board1.totalVictories) {
      return -1;
    }
    if(board2.goalsBalance > board1.goalsBalance) {
      return 1
    }
    if(board2.goalsBalance< board1.goalsBalance) {
      return -1;
    }
    if(board2.goalsFavor> board1.goalsFavor) {
      return 1;
    }
    if( board2.goalsFavor< board2.goalsFavor) {
      return -1;
    }
    if(board2.goalsOwn > board1.goalsOwn) {
      return 1;
    }
    if(board2.goalsOwn < board1.goalsOwn)  {
      return -1;
    }
    return 0;
  }

  public  totalMatches(team:ITeam, matches:IMatches[]):ILeaderBoard {
    let obj = {...this.obj, name: team.teamName}

    const objHome = this.home(team, matches);
    const objAway = this.outside(team, matches);

    obj.totalGames = objHome.totalGames + objAway.totalGames
    obj.totalVictories = objHome.totalVictories + objAway.totalVictories
    obj.goalsFavor = objHome.goalsFavor + objAway.goalsFavor
    obj.goalsOwn = objHome.goalsOwn + objAway.goalsOwn
    obj.totalDraws = objHome.totalDraws + objAway.totalDraws
    obj.totalLosses = objHome.totalLosses + objAway.totalLosses
    obj.goalsBalance = obj.goalsFavor - obj.goalsOwn;
    obj.totalPoints = obj.totalVictories*3 + obj.totalDraws
    obj.efficiency = parseFloat((((obj.totalPoints)/(obj.totalGames*3)) *100).toFixed(2))
    return obj;
  }

  public home(team:ITeam, matches:IMatches[]){
    const objHome = matches.filter((matche) => matche.homeTeam === team.id)
    .reduce((acc, match) => {
      return {
        ...acc,
        totalDraws: match.homeTeamGoals === match.awayTeamGoals? acc.totalDraws+ 1: acc.totalDraws,
        totalVictories: match.homeTeamGoals> match.awayTeamGoals? acc.totalVictories+ 1: acc.totalVictories,
        totalLosses: match.homeTeamGoals < match.awayTeamGoals? acc.totalLosses + 1: acc.totalLosses,
        totalGames: acc.totalGames + 1,
        goalsFavor: acc.goalsFavor + match.homeTeamGoals,
        goalsOwn: acc.goalsOwn + match.awayTeamGoals
      }
    },{...this.obj, name: team.teamName})
    objHome.goalsBalance = objHome.goalsFavor - objHome.goalsOwn;
    objHome.totalPoints = objHome.totalVictories*3 + objHome.totalDraws
    objHome.efficiency = parseFloat((((objHome.totalPoints)/(objHome.totalGames*3)) *100).toFixed(2))
    return objHome;
  }

  public outside(team:ITeam, matches:IMatches[]){
    const objAway = matches.filter((matche) => matche.awayTeam === team.id)
    .reduce((acc, match) => {
      return {
        ...acc,
        totalVictories: match.homeTeamGoals< match.awayTeamGoals? acc.totalVictories + 1: acc.totalVictories,
        totalDraws:  match.homeTeamGoals === match.awayTeamGoals? acc.totalDraws+1: acc.totalDraws,
        totalLosses: match.homeTeamGoals > match.awayTeamGoals? acc.totalLosses + 1: acc.totalLosses ,
        totalGames: acc.totalGames + 1,
        goalsFavor: acc.goalsFavor + match.awayTeamGoals,
        goalsOwn: acc.goalsOwn + match.homeTeamGoals
      }
    },{...this.obj, name: team.teamName})

    objAway.goalsBalance = objAway.goalsFavor - objAway.goalsOwn;
    objAway.totalPoints = objAway.totalVictories*3 + objAway.totalDraws
    objAway.efficiency = parseFloat((((objAway.totalPoints)/(objAway.totalGames*3)) *100).toFixed(2))
    return objAway;
  }

}