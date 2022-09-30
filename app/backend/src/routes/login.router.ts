import { Router } from "express";
import LoginService from "../services/LoginService";
import LoginController from "../controllers/LoginController";
import LoginModel from "../Repository/LoginModel";
import LoginMiddleware from "../middlewares/login.middleware";

const router = Router();
const loginModel = new LoginModel()
const loginService = new LoginService(loginModel)
const loginController = new LoginController(loginService);
const loginMiddleware = new LoginMiddleware();

router.post('/',loginMiddleware.validateLogin, loginController.createSession)

export default router;