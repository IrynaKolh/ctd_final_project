import axios from 'axios';
import { FormikHelpers, useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const SellerRegisterForm: React.FC = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${user?.token}`,
  };
  const onSubmit = async (
    values: { isSeller: boolean },
    actions: FormikHelpers<{ isSeller: boolean }>
  ) => {
    try {
      const response = await axios.patch('http://localhost:3000/auth/register', values, {
        headers,
      });
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      login(user);
      actions.resetForm();
      navigate('/my-store');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const { errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      isSeller: false,
    },
    onSubmit,
  });

  return (
    <div className="flex flex-col justify-center p-3">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="m-3 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
          Become a seller
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4" action="#" method="PATCH">
          <div className="">
            <input
              type="checkbox"
              name="isSeller"
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <span>I want to be a seller</span>
          </div>

          {errors.isSeller && touched.isSeller && <div>{errors.isSeller}</div>}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="my-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerRegisterForm;
