import React from 'react';
import { storeSchema } from '../schemas';
import { FormikHelpers, useFormik } from 'formik';
import { StoreFormProps, StoreInfo } from '../models/interfaces';
import { useAuth } from '../utils/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StoreForm: React.FC<StoreFormProps> = ({ title, storeInfo, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, setStoreInfo } = useAuth();
  const headers = {
    Authorization: `Bearer ${user?.token}`,
  };

  const onSubmit = async (values: StoreInfo, actions: FormikHelpers<StoreInfo>) => {
    const newStore: StoreInfo = {
      name: values.name,
      description: values.description,
      address: values.address,
      contact: values.contact,
      ratings: values.ratings,
      socialMedia: values.socialMedia,
    };
    try {
      let response;
      if (title === 'Update Store') {
        response = await axios.patch(`http://localhost:3000/store/${storeInfo?._id}`, newStore, {
          headers,
        });
      } else {
        response = await axios.post('http://localhost:3000/store', newStore, { headers });
      }
      const storeData = response?.data;
      localStorage.setItem('storeInfo', JSON.stringify(storeData));
      setStoreInfo(storeData);
      actions.resetForm();
      onClose();
      navigate('/my-store');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: storeInfo || {
        name: '',
        description: '',
        address: {
          street: '',
          city: '',
          state: '',
          country: '',
          zipCode: '',
        },
        contact: {
          phone: '',
          email: '',
        },
        ratings: 0,
        socialMedia: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
        },
      },
      validationSchema: storeSchema,
      onSubmit,
      enableReinitialize: true,
    });

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
          <div className="w-full md:max-w-3xl bg-white rounded-lg shadow-md p-6">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form onSubmit={handleSubmit} action="#" method="POST">
              <div className="space-y-1">
                <div>
                  <h2 className="text-xl font-semibold  text-gray-900">{title}</h2>
                  <p className="text-xs  leading-5 text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                  </p>

                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-6">
                    <div className="sm:col-span-full">
                      <label
                        htmlFor="name"
                        className="block text-left text-base font-medium leading-5 text-gray-900"
                      >
                        Store name
                        <span className="text-xs  text-red-600 pl-2">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="flex relative rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-xs"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            placeholder="Enter your store name"
                            required
                          />
                        </div>
                        {errors.name && touched.name && (
                          <p className="text-red-500 text-xs text-thin text-left h-5 absolute pl-5">
                            {errors.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="description"
                        className="block text-left text-base font-medium leading-5 text-gray-900"
                      >
                        About
                        <span className="text-xs  text-red-600 pl-2">*</span>
                        <span className="text-xs  text-gray-600 pl-2">
                          Write a few sentences about your store.
                        </span>
                      </label>
                      <div className="mt-2 relative">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-xs"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                        />
                        {errors.description && touched.description && (
                          <p className="text-red-500 text-xs text-thin text-left h-5 absolute pl-5">
                            {errors.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pb-2">
                  <h2 className="text-xl font-semibold  text-gray-900">
                    Address and contact information
                  </h2>
                  <p className="mt-1 text-xs  leading-5 text-gray-600">
                    Use your real contact information for get orders and connection with customers.
                  </p>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="contact.email"
                        className="block text-left text-base font-medium leading-5 text-gray-900"
                      >
                        Email address
                        <span className="text-xs  text-red-600 pl-2">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="contact.email"
                          name="contact.email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.contact.email}
                          autoComplete="Your email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-xs"
                        />
                      </div>
                      {errors.contact?.email && touched.contact?.email && (
                        <p className="text-red-500 text-xs text-thin text-left h-5 absolute pl-5">
                          {errors.contact?.email}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="contact.phone"
                        className="block text-left text-base font-medium leading-5 text-gray-900"
                      >
                        Your phone number
                        <span className="text-xs  text-red-600 pl-2">*</span>
                      </label>
                      <div className="mt-2 relative">
                        <input
                          type="text"
                          id="contact.phone"
                          name="contact.phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.contact.phone}
                          autoComplete="+1 555 555-5555"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-xs"
                        />
                      </div>
                      {errors.contact?.phone && touched.contact?.phone && (
                        <p className="text-red-500 text-xs text-thin text-left h-5 absolute pl-5">
                          {errors.contact?.phone}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="address.country"
                        className="block text-left text-base font-medium leading-5 text-gray-900"
                      >
                        Country
                        <span className="text-xs  text-red-600 pl-2">*</span>
                      </label>
                      <div className="mt-2 relative">
                        <select
                          id="address.country"
                          name="address.country"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address.country}
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs  sm:text-xs"
                        >
                          <option hidden>Choose a country</option>
                          <option>United States</option>
                          <option>Mexico</option>
                          <option>Canada</option>
                        </select>
                        {errors.address?.country && touched.address?.country && (
                          <p className="text-red-500 text-xs text-thin text-left h-5 absolute pl-5">
                            {errors.address?.country}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="address.street"
                        className="block text-left text-base font-medium leading-5 text-gray-900"
                      >
                        Street address
                        <span className="text-xs  text-red-600 pl-2">*</span>
                      </label>
                      <div className="mt-2 relative">
                        <input
                          type="text"
                          id="address.street"
                          name="address.street"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address.street}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-xs"
                        />
                        {errors.address?.street && touched.address?.street && (
                          <p className="text-red-500 text-xs text-thin text-left h-5 absolute pl-5">
                            {errors.address?.street}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="address.city"
                        className="block text-left text-base font-medium leading-5 text-gray-900"
                      >
                        City
                        <span className="text-xs  text-red-600 pl-2">*</span>
                      </label>
                      <div className="mt-2 relative">
                        <input
                          type="text"
                          id="address.city"
                          name="address.city"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address.city}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-xs"
                        />
                        {errors.address?.city && touched.address?.city && (
                          <p className="text-red-500 text-xs text-thin text-left h-5 absolute pl-5">
                            {errors.address?.city}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address.state"
                        className="block text-left text-base font-medium leading-5 text-gray-900"
                      >
                        State / Province
                        <span className="text-xs  text-red-600 pl-2">*</span>
                      </label>
                      <div className="mt-2 relative">
                        <input
                          type="text"
                          name="address.state"
                          id="address.state"
                          autoComplete="address.state"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address.state}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-xs"
                        />
                        {errors.address?.state && touched.address?.state && (
                          <p className="text-red-500 text-xs text-thin text-left h-5 absolute pl-5">
                            {errors.address?.state}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address.zipCode"
                        className="block text-left text-base font-medium leading-5 text-gray-900"
                      >
                        ZIP / Postal code
                        <span className="text-xs  text-red-600 pl-2">*</span>
                      </label>
                      <div className="mt-2 relative">
                        <input
                          type="text"
                          name="address.zipCode"
                          id="address.zipCode"
                          autoComplete="address.zipCode"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address.zipCode}
                          className="block text-left w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-xs"
                        />
                        {errors.address?.zipCode && touched.address?.zipCode && (
                          <p className="text-red-500 text-xs text-thin text-left h-5 absolute pl-5">
                            {errors.address?.zipCode}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pb-2">
                  <h2 className="text-xl font-semibold text-gray-900">Social Media Information</h2>

                  <div className="mt-2 space-y-10">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-grow justify-between items-center">
                        <label
                          htmlFor="socialMedia.facebook"
                          className="block text-left text-base font-medium leading-5 text-gray-900"
                        >
                          Facebook
                        </label>
                        <div className="w-3/4">
                          <div className="flex relative rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <input
                              type="text"
                              name="socialMedia.facebook"
                              id="socialMedia.facebook"
                              autoComplete="socialMedia.facebook"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-xs"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.socialMedia?.facebook}
                              placeholder="Facebook"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-grow justify-between items-center">
                        <label
                          htmlFor="socialMedia.twitter"
                          className="block text-left text-base font-medium leading-5 text-gray-900"
                        >
                          Twitter
                        </label>
                        <div className="w-3/4">
                          <div className="flex relative rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <input
                              type="text"
                              name="socialMedia.twitter"
                              id="socialMedia.twitter"
                              autoComplete="socialMedia.twitter"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-xs"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.socialMedia?.twitter}
                              placeholder="Twitter"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-grow justify-between items-center">
                        <label
                          htmlFor="socialMedia.instagram"
                          className="block text-left text-base font-medium leading-5 text-gray-900"
                        >
                          Instagram
                        </label>
                        <div className="w-3/4">
                          <div className="flex relative rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <input
                              type="text"
                              name="socialMedia.instagram"
                              id="socialMedia.instagram"
                              autoComplete="socialMedia.instagram"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-xs"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.socialMedia?.instagram}
                              placeholder="Instagram"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-grow justify-between items-center">
                        <label
                          htmlFor="socialMedia.linkedin"
                          className="block text-left text-base font-medium leading-5 text-gray-900"
                        >
                          Linkedin
                        </label>
                        <div className="w-3/4">
                          <div className="flex relative rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <input
                              type="text"
                              name="socialMedia.linkedin"
                              id="socialMedia.linkedin"
                              autoComplete="socialMedia.linkedin"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-xs"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.socialMedia?.linkedin}
                              placeholder="Linkedin"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-grow justify-between items-center">
                        <label
                          htmlFor="socialMedia.youtube"
                          className="block text-left text-base font-medium leading-5 text-gray-900"
                        >
                          YouTube
                        </label>
                        <div className="w-3/4">
                          <div className="flex relative rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <input
                              type="text"
                              name="socialMedia.youtube"
                              id="socialMedia.youtube"
                              autoComplete="socialMedia.youtube"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-xs"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.socialMedia?.youtube}
                              placeholder="YouTube"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-grow justify-between items-center">
                        <label
                          htmlFor="socialMedia.tiktok"
                          className="block text-left text-base font-medium leading-5 text-gray-900"
                        >
                          TikTok
                        </label>
                        <div className="w-3/4">
                          <div className="flex relative rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <input
                              type="text"
                              name="socialMedia.tiktok"
                              id="socialMedia.tiktok"
                              autoComplete="socialMedia.tiktok"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-xs"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.socialMedia?.tiktok}
                              placeholder="TikTok"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-grow justify-between items-center">
                        <label
                          htmlFor="socialMedia.website"
                          className="block text-left text-base font-medium leading-5 text-gray-900"
                        >
                          Website
                        </label>
                        <div className="w-3/4">
                          <div className="flex relative rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <input
                              type="text"
                              name="socialMedia.website"
                              id="socialMedia.website"
                              autoComplete="socialMedia.website"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-xs"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.socialMedia?.website}
                              placeholder="Website"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-x-6">
                {/* <button
                  type="button"
                  onClick={onClose}
                  className="text-base font-semibold leading-5 text-gray-900"
                >
                  Cancel
                </button> */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {title}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StoreForm;
