import { Router } from "express";
import LoginService from "../services/Login/LoginService";
import LoginController from "../controllers/Login/LoginController";
import LoginModel from "../Repository/Login/LoginModel";
import LoginMiddleware from "../middlewares/login.middleware";
import AuthMiddleware from '../middlewares/auth.middleware';

const router = Router();
const loginModel = new LoginModel()
const loginService = new LoginService(loginModel)
const loginController = new LoginController(loginService);
const loginMiddleware = new LoginMiddleware();
const authMiddleware = new AuthMiddleware();

router.post('/',loginMiddleware.validateLogin, loginController.createSession)
router.get('/validate', authMiddleware.authUser, loginController.validateAuthorization)

export default router;