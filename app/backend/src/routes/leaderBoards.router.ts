import { Router } from "express";
import LeaderBoardsService from '../services/LeaderBoards/LeaderBoardsService';
import LeaderBoardsController from '../controllers/LeaderBoards/LeaderBoardscontroller';
import LeaderBoardsModel from '../Repository/LeaderBoard/LeaderModel';


const router = Router();
const leaderBoardsModel = new LeaderBoardsModel()
const leaderBoardsService = new LeaderBoardsService(leaderBoardsModel)
const leaderBoardsController = new LeaderBoardsController(leaderBoardsService);

router.get('/home', leaderBoardsController.getAllHome)

export default router;