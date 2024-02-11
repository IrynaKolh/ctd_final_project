import React, { useState } from 'react';
import { MyStoreInfoProps, ProductResponse } from '../models/interfaces';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import ProductForm from './ProductForm';
import { Link } from 'react-router-dom';

const MyStoreInfo: React.FC<MyStoreInfoProps> = ({
  storeInfo,
  products,
  onDelete,
  setNeedUpdate,
}) => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);

  const handleOpenAddProductModal = (product: ProductResponse) => {
    setSelectedProduct(product);
    setIsAddProductModalOpen(true);
  };

  const handleCloseAddProductModal = () => {
    setSelectedProduct(null);
    setIsAddProductModalOpen(false);
  };

  return (
    <>
      {storeInfo ? (
        <>
          <div className="flex items-center justify-center w-3/4 m-auto text-justify my-2">
            <p className="text-xl text-yellow-50 pb-2">{storeInfo.description}</p>
          </div>
          <div className="w-3/4 m-auto">
            {/* <h3>Products List</h3> */}
            {products?.length > 0 ? (
              <ul
                role="list"
                className="divide-y px-5 divide-gray-900 bg-white opacity-85 rounded-lg drop-shadow-md"
              >
                {products.map((product) => (
                  <li
                    key={product._id}
                    className="w-full flex justify-between items-center gap-x-6 py-2"
                  >
                    <Link to={`/products/${product._id}`}>
                      <img
                        className="h-12 w-12 flex-none rounded-full bg-gray-50 object-cover object-center"
                        src={
                          Array.isArray(product.imageUrl) && product.imageUrl.length > 0
                            ? product.imageUrl[0]
                            : typeof product.imageUrl === 'string'
                              ? product.imageUrl
                              : ''
                        }
                        alt=""
                      />
                    </Link>
                    <div className="w-1/6 flex items-start">
                      <p className="text-sm text-left font-semibold leading-6 text-gray-900">
                        {product.name}
                      </p>
                    </div>
                    <div className="w-2/6 flex justify-start truncate">
                      <p className="text-sm text-left font-semibold leading-6 text-gray-900">
                        {product.description}
                      </p>
                    </div>
                    <div className="w-1/12 flex justify-start">
                      <p className="text-sm leading-6 text-gray-900">{product.price}</p>
                    </div>
                    <div className="w-1/12 flex justify-start">
                      <p className="text-sm leading-6 text-gray-900">{product.category}</p>
                    </div>
                    {/* <p className="text-sm leading-6 text-gray-900">{product.createdAt}</p>
                    <p className="text-sm leading-6 text-gray-900">{product.updatedAt}</p> */}
                    <div>
                      <button
                        onClick={() => handleOpenAddProductModal(product)}
                        className="text-white px-3 mr-3 border-2 border-transparent p-1 rounded text-base hover:border-yellow-700 hover:bg-white hover:text-gray-500"
                      >
                        <IconEdit size={26} strokeWidth={1.5} color="#6b7280" />
                      </button>
                      <ProductForm
                        isAddProductModalOpen={isAddProductModalOpen}
                        onClose={handleCloseAddProductModal}
                        setNeedUpdate={setNeedUpdate}
                        productInfo={selectedProduct}
                        title="Edit Product"
                      ></ProductForm>
                      <button
                        type="button"
                        onClick={() => onDelete(product._id)}
                        className="text-whitepx-3 mr-3 border-2 border-transparent p-1 rounded text-base hover:border-yellow-700 hover:bg-white hover:text-gray-500"
                      >
                        <IconTrash size={26} strokeWidth={1.5} color="#6b7280" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-2xl text-yellow-50 pt-10">No products found</p>
            )}
          </div>
        </>
      ) : (
        <div>
          <h3>You have not created a store yet! Click "Create store" buttton to get started! </h3>
        </div>
      )}
    </>
  );
};

export default MyStoreInfo;
