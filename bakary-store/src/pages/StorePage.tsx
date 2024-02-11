import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/useAuth';
import StoreForm from '../components/StoreForm';
import MyStoreInfo from '../components/MyStoreInfo';
import storeBg from '../assets/store-bg.jpg';
import ProductForm from '../components/ProductForm';
import { ProductResponse } from '../models/interfaces';
import MessegeInfo from '../components/MessegeInfo';

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

  const deleteProduct = async (productId: string) => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`, { headers });
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
          const response = await axios.get('http://localhost:3000/store/my-store', { headers });
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
        const response = await axios.get('http://localhost:3000/products/my-products', { headers });
        setProducts(response.data.products);
        setNeedUpdate(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [needUpdate]);

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

  return (
    <div className="bg-cover bg-center h-lvh pt-5" style={{ backgroundImage: `url(${storeBg})` }}>
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
