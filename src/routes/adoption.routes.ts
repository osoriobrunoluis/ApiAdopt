import { Router } from "express";
import { adoptionUpdate, createAdoption, readAdoptionById, readAllAdoptions, readMyAdoptions, adoptionDelete } from "../controllers/adoption.controller";
import { ensureAuth } from "../middlewares/ensureAuth";

export const adoptionRouter = Router()

adoptionRouter.use(ensureAuth)
adoptionRouter.post('/', createAdoption)
adoptionRouter.get('/', readAllAdoptions)
adoptionRouter.get('/myAdoptions', readMyAdoptions)
adoptionRouter.get('/:adoption_id', readAdoptionById)
adoptionRouter.patch('/update/:adoption_id', adoptionUpdate)
adoptionRouter.delete('/delete/:adoption_id', adoptionDelete)