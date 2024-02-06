import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/useAuth';
import StoreForm from '../components/StoreForm';
import MyStoreInfo from '../components/MyStoreInfo';

const StorePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, store, setStoreInfo } = useAuth();
  const headers = {
    Authorization: `Bearer ${user?.token}`,
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

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {store ? (
        <>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleOpen}
              className="text-white bg-yellow-700 border-2 border-transparent p-1 rounded text-base hover:border-yellow-700 hover:bg-white hover:text-gray-500"
            >
              Update Store
            </button>
            <StoreForm
              isOpen={isOpen}
              onClose={handleClose}
              title="Update Store"
              storeInfo={store.store}
            />
          </div>
          <MyStoreInfo storeInfo={store.store}></MyStoreInfo>
        </>
      ) : (
        <div>
          <button
            type="button"
            onClick={handleOpen}
            className="text-white bg-yellow-700 border-2 border-transparent p-1 rounded text-base hover:border-yellow-700 hover:bg-white hover:text-gray-500"
          >
            Create Store
          </button>
          <StoreForm isOpen={isOpen} onClose={handleClose} title="Create Store" storeInfo={null} />
        </div>
      )}
    </div>
  );
};

export default StorePage;
