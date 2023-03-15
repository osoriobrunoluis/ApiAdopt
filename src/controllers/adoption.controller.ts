import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { adoptionUpdateService, createAdoptionService, deleteAdoptionService, readAdoptionByIdService, readAllAdoptionsService, readMyAdoptionsService } from "../services/adoption.services";

export const createAdoption = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.user
  const data = req.body

  try {
    for(let key in data) {
      if(key !== 'pet_id') {
        throw new AppError('only the `pet_id` value must be informed', 401)
      }
    }
    const adoption = await createAdoptionService(id, data.pet_id)

    return res.send(adoption)
  } catch (error) {
    next(error)
  }
}

export const readAllAdoptions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adoptions = await readAllAdoptionsService()

    return res.send(adoptions)
  } catch (error) {
    next(error)
  }
}

export const readAdoptionById = async (req: Request, res: Response, next: NextFunction) => {
  const {adoption_id} = req.params

  try {
    const adoption = await readAdoptionByIdService(adoption_id)

    return res.send(adoption)
  } catch (error) {
    next(error)
  }
}

export const readMyAdoptions = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.user
  console.log('oi')

  try {
    const adoptions = await readMyAdoptionsService(id)

    return res.send(adoptions)
  } catch (error) {
    next(error)
  }
}

export const adoptionUpdate = async (req: Request, res: Response, next: NextFunction) => {
  const data: {
    adopter_id: string
    pet_id: string
  } = req.body
  const {adoption_id} = req.params

  try {
    for(let key in data) {
      const keys = ['adopter_id', 'pet_id']

      if(!keys.includes(key)) {
        throw new AppError(`Please verify the informed keys, only: 'adopter_id' and 'pet_id' are aceptable`)
      }
    }

    const adopt = await adoptionUpdateService(adoption_id, data)

    return res.send(adopt)
    
  } catch (error) {
    next(error)
  }
}

export const adoptionDelete = async (req: Request, res: Response, next: NextFunction) => {
  const {adoption_id} = req.params

  try {
    const deleted = await deleteAdoptionService(adoption_id)

    return res.status(200).send({message: 'Adoption deleted'})
  } catch (error) {
    next(error)
  }
}