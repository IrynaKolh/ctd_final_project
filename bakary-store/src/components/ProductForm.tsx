import React from 'react';
import { Product, ProductFormProps } from '../models/interfaces';
import { useAuth } from '../utils/useAuth';
import { FormikHelpers, useFormik } from 'formik';
import axios from 'axios';
import { productSchema } from '../schemas';
import { IconPhoto } from '@tabler/icons-react';
import PrevievImage from './PreviewImage';
import { uploadImage } from '../utils/uploadImage';

const ProductForm: React.FC<ProductFormProps> = ({ title, onClose, isAddProductModalOpen }) => {
  const { user } = useAuth();
  const headers = {
    Authorization: `Bearer ${user?.token}`,
  };

  const onSubmit = async (values: Product, actions: FormikHelpers<Product>) => {
    const storeInfo = await axios.get('http://localhost:3000/store/my-store', { headers });
    const store = storeInfo.data;
    const { name, price, description, imageUrl, category } = values;
    let urlCloud;

    try {
      if (typeof values.imageUrl === 'string') {
        const fileResponse = await axios.get(imageUrl[0], { responseType: 'blob' });
        const imageFile = new File([fileResponse.data], 'image.jpg', { type: 'image/jpeg' });
        urlCloud = await uploadImage(imageFile);
      } else {
        urlCloud = await uploadImage(imageUrl as unknown as File);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    const newProduct: Product = {
      name: name,
      description: description,
      price: price,
      imageUrl: [urlCloud],
      category: category,
      storeId: store.store._id,
    };
    console.log(newProduct);

    try {
      let response;
      if (title === 'Edit Product') {
        response = await axios.patch(`http://localhost:3000/products/${1}`, newProduct, {
          headers,
        });
      } else {
        response = await axios.post('http://localhost:3000/products', newProduct, { headers });
      }
      const product = response?.data;
      console.log(product);
      actions.resetForm();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: '',
      price: 0,
      description: '',
      imageUrl: [],
      storeId: '',
      category: '',
    },
    validationSchema: productSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <>
      {isAddProductModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
          <div className="w-full md:max-w-3xl bg-white rounded-lg shadow-md p-6">
            <button
              className="absolute top-10 right-20 text-gray-500 hover:text-gray-700 bg-white p-3 rounded-full"
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
                  <h2 className="text-xl font-semibold p-3 text-gray-900 text-center">{title}</h2>

                  <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-6">
                    <div className="sm:col-span-full">
                      <label
                        htmlFor="name"
                        className="block text-left text-base font-medium leading-5 text-gray-900"
                      >
                        Product name
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
                            placeholder="Enter your product name"
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
                        Discription
                        <span className="text-xs  text-red-600 pl-2">*</span>
                        <span className="text-xs  text-gray-600 pl-2">Describe your product.</span>
                      </label>
                      <div className="mt-2 relative">
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
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

                    <div className="col-span-full">
                      <label
                        htmlFor="imageUrl"
                        className="block text-left text-base font-medium leading-5 text-gray-900"
                      >
                        Product photo
                        <span className="text-xs  text-red-600 pl-2">*</span>
                        <span className="text-xs  text-gray-600 pl-10">
                          Drag and drop or click to select a file PNG, JPG, up to 5MB
                        </span>
                      </label>
                      <div className="w-42 h-42 mt-2 relative flex justify-center gap-4 rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        {values.imageUrl ? (
                          <PrevievImage file={values.imageUrl} />
                        ) : (
                          <IconPhoto
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                        )}

                        <input
                          type="file"
                          id="imageUrl"
                          name="imageUrl"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const file = e.target.files && e.target.files[0];
                            if (file) {
                              setFieldValue('imageUrl', file);
                            }
                          }}
                        />

                        {errors.imageUrl && touched.imageUrl && (
                          <p className="text-red-500 text-xs text-thin text-left h-5 absolute pl-5">
                            {errors.imageUrl}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full mt-2 grid grid-cols-1 gap-2 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="price"
                          className="block text-left text-base font-medium leading-5 text-gray-900"
                        >
                          Price
                          <span className="text-xs  text-red-600 pl-2">*</span>
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            inputMode="numeric"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-xs"
                          />
                        </div>
                        {errors.price && touched.price && (
                          <p className="text-red-500 text-xs text-thin text-left h-5 absolute pl-5">
                            {errors.price}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="category"
                          className="block text-left text-base font-medium leading-5 text-gray-900"
                        >
                          Category
                          <span className="text-xs  text-red-600 pl-2">*</span>
                        </label>
                        <div className="mt-2 relative">
                          <select
                            id="category"
                            name="category"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.category}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs"
                          >
                            <option hidden>Choose a type</option>
                            <option>Cakes</option>
                            <option>Cookies</option>
                            <option>Pies</option>
                            <option>Breads</option>
                            <option>Cupcakes</option>
                            <option>Waffles</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-x-6">
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

export default ProductForm;
