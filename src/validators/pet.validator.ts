import * as yup from 'yup'

export const createPetSchema = yup.object().shape({
  name: yup.string().required(`'name' field is required`),
  bread: yup.string().required(`'bread' field is required`),
  species: yup.string().required(`'species' field is required`),
  avatar_url: yup.string().required(`'avatar_url' is required`).url('please inform a valid image link')
})