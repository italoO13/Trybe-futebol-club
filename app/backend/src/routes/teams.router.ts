import { Router } from "express";
import TeamsService from "../services/Teams/TeamService";
import TeamsController from "../controllers/Teams/TeamsController";
import TeamsModel from "../Repository/Teams/TeamsModel";


const router = Router();
const teamsModel = new TeamsModel()
const teamsService = new TeamsService(teamsModel)
const teamsController = new TeamsController(teamsService);

router.get('/', teamsController.getAll)

export default router;