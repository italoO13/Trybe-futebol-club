import { Router } from "express";
import loginRouter from './login.router';
import teamsRouter from './teams.router';
import matchesRouter from './matches.router';
import leaderBoardsRouter from './leaderBoards.router';

const router = Router();
router.use('/login', loginRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardsRouter);

export default router;