import { resolve } from "path"
import { prisma } from "../app"
import { AppError } from "../errors/appError"

export const createAdoptionService = async (adopter_id: string, pet_id: string) => {
  const checkAdopter = await prisma.user.findUnique({
    where: {
      id: adopter_id
    }
  })

  if (!checkAdopter) {
    throw new AppError('User not found, please login and try again', 404)
  }

  const checkPet = await prisma.pet.findUnique({
    where: {
      id: pet_id
    }
  })

  if (!checkPet) {
    throw new AppError('Pet not found, please verify the pet_id and try again', 404)
  }

  if (checkPet.available_for_adoption === false) {
    throw new AppError('Pet already be adopt, please chose another one', 401)
  }

  const adoption = await prisma.adoption.create({
    data: {
      adopter_id,
      pet_id
    },
    include: {
      adopter: true,
      pet: true
    }
  })

  const petAdopt = await prisma.pet.update({
    where: {
      id: pet_id
    },
    data: {
      available_for_adoption: false,
      guardian_id: adopter_id
    }
  })

  const { id, adopter, ...rest } = adoption
  const { password, ...adopterRest } = adopter

  const response = {
    id,
    pet: { ...petAdopt },
    adopter: { ...adopterRest }
  }

  return response
}

export const readAllAdoptionsService = async () => {
  const adoptions = await prisma.adoption.findMany({
    include: {
      adopter: true,
      pet: true
    }
  })

  const response: any[] = []

  adoptions.forEach(adoption => {
    const { id, adopter, pet } = adoption
    const { password, ...rest } = adopter

    const newAdoption = {
      id,
      adopter: { ...rest },
      pet: { ...pet }
    }

    response.push(newAdoption)
  })

  return response
}

export const readAdoptionByIdService = async (id: string) => {
  const check = await prisma.adoption.findUnique({
    where: {
      id
    },
    include: {
      adopter: true,
      pet: true
    }
  })

  if (!check) {
    throw new AppError('Adoption not found', 404)
  }

  const { id: adopt_id, adopter, pet } = check
  const { password, ...rest } = adopter
  const response = {
    id: adopt_id,
    adopter: { ...rest },
    pet: { ...pet }
  }

  return response
}

export const readMyAdoptionsService = async (id: string) => {

  const check = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!check) {
    throw new AppError('User not found, please login and try again', 404)
  }

  const adoptions = await prisma.adoption.findMany({
    where: {
      adopter_id: id
    },
    include: {
      adopter: true,
      pet: true
    }
  })

  const res: any[] = []

  adoptions.forEach(adoption => {

    const { id: adopt_id, adopter, pet } = adoption
    const { password, ...rest } = adopter
    const response = {
      id: adopt_id,
      adopter: { ...rest },
      pet: { ...pet }
    }

    res.push(response)
  })


  return res
}

export const adoptionUpdateService = async (adoption_id: string, data: {
  adopter_id?: string
  pet_id?: string
}) => {
  const checkAdopter = await prisma.user.findUnique({
    where: {
      id: data.adopter_id
    }
  })

  if(!checkAdopter) {
    throw new AppError('User not found, please login and try again', 404)
  }

  const checkPet = await prisma.pet.findUnique({
    where: {
      id: data.pet_id
    }
  })

  if(!checkPet) {
    throw new AppError('Pet not found', 404)
  }

  const update = await prisma.adoption.update({
    where: {
      id: adoption_id
    },
    data: {
      adopter_id: data.adopter_id,
      pet_id: data.pet_id
    },
    include: {
      pet: true,
      adopter: true
    }
  })

  const {id: adopt_id, adopter, pet} = update
  const {password, ...rest} = adopter

  const response = {
    id: adopt_id,
    adopter: {...rest},
    pet: {...pet}
  }

  return response
}

export const deleteAdoptionService = async (adoption_id: string) => {
  const check = await prisma.adoption.findUnique({
    where: {
      id: adoption_id
    }
  })

  if(!check) {
    throw new AppError('Adoption not found', 404)
  }

  const deleted = await prisma.adoption.delete({
    where: {
      id: adoption_id
    }
  })

  return deleted
}