import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
// min 6 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup.string().required('Required'),
});

export const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(50, 'Username cannot exceed 50 characters')
    .required('Required'),
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .matches(passwordRules, { message: 'Please create a stronger password' })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
});

export const sellerSchema = yup.object().shape({
  isSeller: yup
    .boolean()
    .required('You must accept to be a seller')
    .oneOf([true], 'You must accept to be a seller'),
});

export const storeSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Storename must be at least 3 characters long')
    .max(50, 'Store name cannot exceed 50 characters')
    .required('Please provide a store name'),
  description: yup.string().required('Please enter store description'),
  address: yup.object().shape({
    country: yup.string().required('Please enter store country'),
    street: yup.string().required('Please enter store street'),
    city: yup.string().required('Please enter store city'),
    state: yup.string().required('Please enter store state'),
    zipCode: yup.string().required('Please enter store zip code'),
  }),
  contact: yup.object().shape({
    phone: yup.string().required('Please enter store phone number'),
    email: yup.string().email('Invalid email address').required('Please enter email'),
  }),
  ratings: yup.number(),
  socialMedia: yup.object().shape({
    facebook: yup.string(),
    twitter: yup.string(),
    instagram: yup.string(),
    linkedin: yup.string(),
    youtube: yup.string(),
    tiktok: yup.string(),
    website: yup.string(),
  }),
});
