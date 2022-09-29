import { Router } from "express";
import LoginService from "../services/LoginService";
import LoginController from "../controllers/LoginController";
import LoginModel from "../Repository/LoginModel";

const router = Router();
const loginModel = new LoginModel()
const loginService = new LoginService(loginModel)
const loginController = new LoginController(loginService);

router.post('/', loginController.createSession)

export default router;