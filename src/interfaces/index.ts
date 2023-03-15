export interface IUserCreate {
  name: string
  email: string
  password: string
  avatar_url: string
}

export interface IUserUpdate {
  name?: string
  avatar_url?: string
}

export interface IUserCreateResponse {
  id: string
  name: string
  email: string
  avatar_url: string
}

export interface IUserResponse {
  id: string
  name: string
  email: string
  avatar_url: string
  adoption_record: IAdoptionResponse[]
  my_pets: IPetResponse[]
}

export interface IAdoptionResponse {
  id: string
  adopter_id: string
  pet_id: string
}

export interface IPetCreate {
  name: string
  bread: string
  species: string
  avatar_url: string
}

export interface IPetResponse {
  id: string
  name: string
  bread: string
  species: string
  avatar_url: string
}

export interface IPetUpdate {
  name?: string
  avatar_url?: string
  species?: string
  bread?: string
}