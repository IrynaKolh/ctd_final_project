import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/useAuth';
import StoreForm from '../components/StoreForm';
import MyStoreInfo from '../components/MyStoreInfo';
import storeBg from '../assets/store-bg.jpg';
import ProductForm from '../components/ProductForm';
import { ProductResponse } from '../models/interfaces';
import MessegeInfo from '../components/MessegeInfo';
import Pagination from '../components/Pagination';

const StorePage: React.FC = () => {
  const [isOpenStoreModal, setisOpenStoreModal] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const { user, store, setStoreInfo } = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const headers = {
    Authorization: `Bearer ${user?.token}`,
  };
  const [products, setProducts] = useState<ProductResponse[] | []>([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const deleteProduct = async (productId: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_URL}/products/${productId}`, { headers });
      const updatedProducts = products.filter((product) => product._id !== productId);
      setProducts(updatedProducts);
      setMessage('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    const checkShop = async () => {
      if (!store) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_REACT_URL}/store/my-store`, {
            headers,
          });
          setStoreInfo(response.data);
          localStorage.setItem('storeInfo', JSON.stringify(response.data));
        } catch (error) {
          console.error('Error fetching shop info:', error);
        }
      }
    };

    checkShop();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_URL}/products/my-products?page=${currentPage}&limit=10`,
          { headers }
        );
        setProducts(response.data.products);
        setAmount(response.data.count);
        setNeedUpdate(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [needUpdate, currentPage]);

  const handleOpenStoreModal = () => {
    setisOpenStoreModal(true);
  };
  const handleCloseStoreModal = () => {
    setisOpenStoreModal(false);
  };

  const handleOpenAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const handleCloseAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const handlePage = (pageTerm: number) => {
    setCurrentPage(pageTerm);
  };

  return (
    <div
      className="bg-cover bg-center pt-5 min-h-svh"
      style={{ backgroundImage: `url(${storeBg})` }}
    >
      <h2 className="inline-block w-2/5 mx-auto mb-3 text-5xl text-yellow-50 italic tracking-widest font-bold p-5 text-center">
        {store?.store?.name}
      </h2>
      {store ? (
        <>
          <div className="block w-2/3 m-auto text-end">
            <button
              type="button"
              onClick={handleOpenAddProductModal}
              className="text-white bg-yellow-700 px-3 mr-3 border-2 border-transparent p-1 rounded text-base hover:border-yellow-700 hover:bg-white hover:text-gray-500"
            >
              + Add product
            </button>
            <ProductForm
              isAddProductModalOpen={isAddProductModalOpen}
              onClose={handleCloseAddProductModal}
              setNeedUpdate={setNeedUpdate}
              title="Add Product"
              productInfo={null}
            ></ProductForm>
            <button
              type="button"
              onClick={handleOpenStoreModal}
              className="text-white bg-yellow-700 px-3 border-2 border-transparent p-1 rounded text-base hover:border-yellow-700 hover:bg-white hover:text-gray-500"
            >
              Update Store
            </button>
            <StoreForm
              isOpenStoreModal={isOpenStoreModal}
              onClose={handleCloseStoreModal}
              title="Update Store"
              storeInfo={store.store}
            />
          </div>
          <MyStoreInfo
            storeInfo={store.store}
            products={products}
            onDelete={deleteProduct}
            setNeedUpdate={setNeedUpdate}
          ></MyStoreInfo>
          {message && <MessegeInfo message={message} onClose={() => setMessage(null)} />}
          {products.length > 0 && (
            <Pagination
              totalPages={Math.ceil(amount / 10)}
              currentPage={currentPage}
              onPageChange={handlePage}
            />
          )}
        </>
      ) : (
        <div>
          <button
            type="button"
            onClick={handleOpenStoreModal}
            className="text-white bg-yellow-700 border-2 border-transparent p-1 rounded text-base hover:border-yellow-700 hover:bg-white hover:text-gray-500"
          >
            Create Store
          </button>
          <StoreForm
            isOpenStoreModal={isOpenStoreModal}
            onClose={handleCloseStoreModal}
            title="Create Store"
            storeInfo={null}
          />
        </div>
      )}
    </div>
  );
};

export default StorePage;
