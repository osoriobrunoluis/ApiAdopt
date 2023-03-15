import * as yup from 'yup'

export const createUserSchema = yup.object().shape({
  name: yup.string().required(`'name' field is required`),
  email: yup.string().required(`'email' field is required`).email('please inform a valid email format'),
  password: yup.string().required(`'password' field is required`),
  avatar_url: yup.string().required(`'avatar_url' is required`).url('please inform a valid image link')
})

export const updateUserSchema = yup.object().shape({
  name: yup.string(),
  avatar_url: yup.string().url('please inform a valid image link')
})