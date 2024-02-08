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

export const productSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Product name should be atleast 3 characters long')
    .max(100, 'Product name cannot exceed 100 characters')
    .required('Please enter product name'),
  description: yup
    .string()
    .min(3, 'Product description should be atleast 3 characters long')
    .max(1000, 'Product description cannot exceed 1000 characters')
    .required('Please enter product description'),
  price: yup
    .number()
    .min(0, 'Price cannot be negative')
    .max(99999, 'Product price cannot exceed 99999')
    .required('Please enter product price'),
  imageUrl: yup
    .mixed()
    .required('Please choose product image')
    .test('fileTypeAndSize', 'Unsupported file type or too large', async (value) => {
      try {
        if (!(value instanceof File)) {
          throw new Error('Value is not a file');
        }
        if (!['image/jpeg', 'image/png'].includes(value.type)) {
          throw new Error('Unsupported file type');
        }
        if (value.size > 1024 * 1024 * 10) {
          throw new Error('File is too large');
        }
        return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return error.message;
      }
    }),
  category: yup
    .string()
    .oneOf(['Cakes', 'Cookies', 'Pies', 'Breads', 'Cupcakes', 'Waffles', 'Others'])
    .required('Please select a category'),
});
