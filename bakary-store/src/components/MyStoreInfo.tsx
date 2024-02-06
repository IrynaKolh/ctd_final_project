import React from 'react';
import { MyStoreInfoProps } from '../models/interfaces';

const MyStoreInfo: React.FC<MyStoreInfoProps> = ({ storeInfo }) => {
  return (
    <>
      {storeInfo ? (
        <div>
          <h3>{storeInfo.name}</h3>
        </div>
      ) : (
        <div>No store found</div>
      )}
    </>
  );
};

export default MyStoreInfo;
