import { Router } from "express";
import MatchesModel from "../Repository/Matches/MatchesModel";
import MatchesService from "../services/Matches/MatchesService";
import MatchesController from "../controllers/Matches/Matchescontroller";
import AuthMiddleware from '../middlewares/auth.middleware';


const router = Router();
const matchesModel = new MatchesModel()
const matchesService = new MatchesService(matchesModel)
const matchesController = new MatchesController(matchesService);
const authMiddleware = new AuthMiddleware();

router.get('/', matchesController.getAll)
router.post('/', authMiddleware.authUser, matchesController.create)
router.patch('/:id/finish', authMiddleware.authUser, matchesController.updatedProgress);

export default router;