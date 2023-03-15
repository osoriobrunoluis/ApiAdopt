import { prisma } from "../app";
import { AppError } from "../errors/appError";
import { IPetCreate, IPetResponse, IPetUpdate } from "../interfaces";



export const createPetService = async (data: IPetCreate, guardian_id: string): Promise<IPetResponse> => {
  const species = ['Cachorro', 'Gato', 'Aves', 'Repteis', 'Outros']

  const checkSpecies = species.includes(data.species)

  if (!checkSpecies) {
    throw new AppError(`Wrong specie informed, only: 'Cachorro', 'Gato', 'Aves', 'Repteis', 'Outros' are aceptable`)
  }

  const pet = await prisma.pet.create({
    data: {
      name: data.name,
      species: data.species,
      bread: data.bread,
      avatar_url: data.avatar_url,
      guardian_id
    }
  })

  return pet
}

export const readAllPetsService = async (): Promise<IPetResponse[]> => {
  const pets = await prisma.pet.findMany({
    include: {
      guardian: true
    }
  })

  const response: IPetResponse[] = []

  pets.forEach(pet => {
    const { guardian, guardian_id, ...petRest } = pet
    const { password, ...guardianRest } = guardian
    const newPet = {
      ...petRest,
      guardian: { ...guardianRest }
    }

    response.push(newPet)
  })

  return response
}

export const readMyPetsService = async (guardian_id: string) => {
  const pets = await prisma.pet.findMany({
    where: {
      guardian_id
    }
  })

  return pets
}

export const updatePetService = async (pet_id: string, data: IPetUpdate) => {
  const checkPet = await prisma.pet.findUnique({
    where: {
      id: pet_id
    }
  })

  if (!checkPet) {
    throw new AppError('Pet not found', 404)
  }

  if (data.species) {
    const species = ['Cachorro', 'Gato', 'Aves', 'Repteis', 'Outros']
    const checkSpecies = species.includes(data.species)

    if (!checkSpecies) {
      throw new AppError(`Wrong specie informed, only: 'Cachorro', 'Gato', 'Aves', 'Repteis', 'Outros' are aceptable`)
    }
  }

  const pet = await prisma.pet.update({
    where: {
      id: pet_id
    },
    data: {
      name: data.name,
      bread: data.bread,
      species: data.species,
      avatar_url: data.avatar_url
    }
  })

  return pet

}

export const deletePetService = async (id: string, user_id: string) => {
  const checkPet = await prisma.pet.findUnique({
    where: {
      id
    }
  })

  if(!checkPet) {
    throw new AppError('Pet not found, pleas check informed id and try again', 404)
  }

  const checkUser = await prisma.user.findUnique({
    where: {
      id: user_id
    }
  })

  if(checkPet.guardian_id !== checkUser?.id) {
    throw new AppError('Only guardians can delete own pets', 401)
  }

  const deletedPet = await prisma.pet.delete({
    where: {
      id
    }
  })

  return deletedPet
}