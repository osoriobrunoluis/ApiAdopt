import { Router } from "express";
import { createUser, deleteProfile, readAllUsers, readProfile, updateProfile } from "../controllers/user.controller";
import { ensureAuth } from "../middlewares/ensureAuth";
import { inputValidator } from "../middlewares/inputValidator";
import { createUserSchema, updateUserSchema } from "../validators/user.validator";

export const userRouter = Router()

userRouter.post('/', inputValidator(createUserSchema), createUser)
userRouter.use(ensureAuth)
userRouter.get('/', readAllUsers)
userRouter.get('/profile', readProfile)
userRouter.patch('/profile', inputValidator(updateUserSchema), updateProfile)
userRouter.delete('/profile', deleteProfile)