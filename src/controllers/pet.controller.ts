import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { createPetService, deletePetService, readAllPetsService, readMyPetsService, updatePetService } from "../services/pet.services";



export const createPet = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user
  const data = req.body

  try {
    for (let key in data) {
      const validKeys = ['name', 'bread', 'species', 'avatar_url']

      if (!validKeys.includes(key)) {
        throw new AppError(`Please verify the informed keys, only: 'name', 'bread', 'species', 'avatar_url' are aceptable`)
      }
    }

    const pet = await createPetService(data, id)

    return res.send(pet)
  } catch (error) {
    next(error)
  }
}

export const readAllPets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pets = await readAllPetsService()

    return res.send(pets)
  } catch (error) {
    next(error)
  }
}

export const readMyPets = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user

  try {
    const pets = await readMyPetsService(id)

    return res.send(pets)
  } catch (error) {
    next(error)
  }
}

export const updatePet = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body
  const { pet_id } = req.params

  try {
    for (let key in data) {
      const validKeys = ['name', 'bread', 'species', 'avatar_url']

      if (!validKeys.includes(key)) {
        throw new AppError(`Please verify the informed keys, only: 'name', 'bread', 'species', 'avatar_url' are aceptable`)
      }
    }

    const pet = await updatePetService(pet_id, data)

    return res.send(pet)
  } catch (error) {
    next(error)
  }
}

export const deletePet = async (req: Request, res: Response, next: NextFunction) => {
  const { pet_id } = req.params
  const { id } = req.user

  try {
    await deletePetService(pet_id, id)

    return res.status(200).send({ message: 'Pet deleted' })
  } catch (error) {
    next(error)
  }
}