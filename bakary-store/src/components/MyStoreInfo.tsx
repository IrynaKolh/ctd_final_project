import React from 'react';
import { MyStoreInfoProps } from '../models/interfaces';

const MyStoreInfo: React.FC<MyStoreInfoProps> = ({ storeInfo }) => {
  return (
    <>
      {storeInfo ? (
        <div className="flex items-center justify-center">
          <p className="text-xl text-gray-500">{storeInfo.description}</p>
        </div>
      ) : (
        <div>
          <h3>You have not created a store yet! Click "Create store" buttton to get started! </h3>
        </div>
      )}
    </>
  );
};

export default MyStoreInfo;
