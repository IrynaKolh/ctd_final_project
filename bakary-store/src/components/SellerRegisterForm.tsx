import axios from 'axios';
import { FormikHelpers, useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
import { sellerSchema } from '../schemas';
import { URL } from '../utils/constants';

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
      const response = await axios.patch(`${URL}/auth/register`, values, {
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

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } = useFormik({
    initialValues: {
      isSeller: false,
    },
    validationSchema: sellerSchema,
    onSubmit,
  });

  return (
    <div className="flex flex-col justify-center p-3">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="m-3 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
          Become a seller
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 relative" action="#" method="PATCH">
          <p className="text-left text-base">
            Welcome to the HM Baking Company! This intuitive form empowers you to set up your very
            own online store effortlessly. By utilizing this form, you can craft a unique store
            page, add products to your inventory, and establish a compelling online presence.
          </p>
          <p className="text-left text-base">
            Thank you for choosing our platform to bring your store to life. If you encounter any
            issues or have questions along the way, our support team is here to assist you.
          </p>
          <div className="mt-6 text-left pl-2 flex gap-2 items-center">
            <input
              type="checkbox"
              name="isSeller"
              onChange={handleChange}
              checked={values.isSeller}
              className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <span>I want to be a seller</span>
          </div>

          {errors.isSeller && touched.isSeller && (
            <p className="text-red-500 text-left text-xs absolute h-5 pl-2">{errors.isSeller}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="my-12 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
