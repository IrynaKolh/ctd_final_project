import React from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { registrationSchema } from '../schemas';
import { Registration, User } from '../models/interfaces';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const onSubmit = async (values: Registration, actions: FormikHelpers<Registration>) => {
    const newUser: User = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    try {
      const response = await axios.post('http://localhost:3000/auth/register', newUser);
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      login(user);
      actions.resetForm();
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema: registrationSchema,
      onSubmit,
    });
  return (
    <div className="flex flex-col justify-center p-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="m-3 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
          Register account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4" action="#" method="POST">
          <div>
            <label
              htmlFor="name"
              className="block text-base font-medium leading-6 text-gray-900 text-left"
            >
              Name
            </label>
            <div className="mt-1 relative">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={values.name}
                onChange={handleChange}
                placeholder="Enter your name"
                onBlur={handleBlur}
                className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-xs text-left h-5 absolute pl-2">{errors.name}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium leading-6 text-gray-900 text-left"
            >
              Email address
            </label>
            <div className="mt-1 relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={handleChange}
                placeholder="Enter your email"
                onBlur={handleBlur}
                className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs text-left h-5 absolute pl-2">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium leading-6 text-gray-900 text-left"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs text-left h-5 absolute pl-2">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-base font-medium leading-6 text-gray-900 text-left"
            >
              Confirm password
            </label>
            <div className="mt-1 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Confirm your password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-xs text-left h-5 absolute pl-2">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="my-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-base text-gray-500">
          Have already account?
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 px-2"
          >
            Login Form
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
