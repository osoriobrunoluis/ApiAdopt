import { Router } from "express";
import { createPet, deletePet, readAllPets, readMyPets, updatePet } from "../controllers/pet.controller";
import { ensureAuth } from "../middlewares/ensureAuth";
import { inputValidator } from "../middlewares/inputValidator";
import { createPetSchema } from "../validators/pet.validator";

export const petRouter = Router()

petRouter.get('/', readAllPets)
petRouter.use(ensureAuth)
petRouter.post('/', inputValidator(createPetSchema), createPet)
petRouter.get('/my_pets', readMyPets)
petRouter.patch('/:pet_id', inputValidator(createPetSchema), updatePet)
petRouter.delete('/:pet_id', deletePet)