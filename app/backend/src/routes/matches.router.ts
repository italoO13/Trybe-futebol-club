import { Router } from "express";
import MatchesModel from "../Repository/Matches/MatchesModel";
import MatchesService from "../services/Matches/MatchesService";
import MatchesController from "../controllers/Matches/Matchescontroller";


const router = Router();
const matchesModel = new MatchesModel()
const matchesService = new MatchesService(matchesModel)
const matchesController = new MatchesController(matchesService);

router.get('/', matchesController.getAll)

export default router;