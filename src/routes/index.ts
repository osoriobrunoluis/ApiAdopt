import { Router } from "express";
import { adoptionRouter } from "./adoption.routes";
import { petRouter } from "./pet.routes";
import { sessionRouter } from "./session.routes";
import { userRouter } from "./user.routes";

export const routes = Router()

routes.use('/users', userRouter)
routes.use('/session', sessionRouter)
routes.use('/pets', petRouter)
routes.use('/adoptions', adoptionRouter)