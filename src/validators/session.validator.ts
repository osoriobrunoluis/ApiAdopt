import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().required('email is required').email('please inform a valid email format'),
  password: yup.string().required('password is required'),
})