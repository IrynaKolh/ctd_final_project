import { FormikHelpers, useFormik } from 'formik';
import React from 'react';
import { loginSchema } from '../schemas';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Login } from '../models/interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const onSubmit = async (values: Login, actions: FormikHelpers<Login>) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', values);
      const user = response.data;
      console.log('User:', user);
      localStorage.setItem('user', JSON.stringify(user));
      actions.resetForm();
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  return (
    <div className="flex flex-col justify-center p-3">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="m-3 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 text-left"
            >
              Email address
            </label>
            <div className="mt-2 relative">
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs text-left h-5 absolute pl-2">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2 relative">
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs text-left h-5 absolute pl-2">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="my-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not registered yet?
          <Link
            to="/registration"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 px-2"
          >
            Registration Form
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
