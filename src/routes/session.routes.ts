import { Router } from "express";
import { AuthController } from "../controllers/session.controller";
import { inputValidator } from "../middlewares/inputValidator";
import { loginSchema } from "../validators/session.validator";

export const sessionRouter = Router()

sessionRouter.post('/login', inputValidator(loginSchema), AuthController.login)