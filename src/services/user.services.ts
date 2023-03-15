import { hash } from "bcryptjs";
import { prisma } from "../app";
import { AppError } from "../errors/appError";
import { IUserCreate, IUserCreateResponse, IUserResponse, IUserUpdate } from "../interfaces";

  export const createUserService = async (data: IUserCreate): Promise<IUserCreateResponse> => {
    const checkUser = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (checkUser) {
      throw new AppError('Email already in use')
    }

    const hashedPass = await hash(data.password, 8)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPass,
        avatar_url: data.avatar_url
      }
    })

    const { password, ...response } = user

    return response
  }

  export const readAllUsersService = async (): Promise<IUserResponse[]> =>  {
    const users = await prisma.user.findMany({
      include: {
        adoption_record: true,
        my_pets: true
      }
    })

    const response: IUserResponse[] = []

    users.forEach(user => {
      const {password, ...res} = user

      response.push(res)
    })

    return response
  }

  export const readProfileService = async (id: string): Promise<IUserResponse> => {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        adoption_record: true,
        my_pets: true
      }
    })

    if(!user) {
      throw new AppError('User not found, please login and try again', 404)
    }

    const {password, ...res} = user

    return res
  }

  export const updateProfileService = async (id: string, data: IUserUpdate): Promise<IUserCreateResponse> => {
    const updateUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        name: data.name,
        avatar_url: data.avatar_url
      }
    })
    
    const {password, ...res} = updateUser

    return res
  }

  export const deleteProfileService = async (id: string): Promise<IUserResponse> => {
    const checkUser = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if(!checkUser) {
      throw new AppError('User not found, please login and try again', 404)
    }

    const deleteUser = await prisma.user.delete({
      where: {
        id
      },
      include: {
        adoption_record: true,
        my_pets: true
      }
    })

    return deleteUser
  }
