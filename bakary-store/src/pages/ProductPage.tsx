import React, { useEffect, useState } from 'react';
import productBg from '../assets/product-bg.jpg';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductResponse } from '../models/interfaces';
import axios from 'axios';
import { IconArrowLeft } from '@tabler/icons-react';

const ProductPage: React.FC = () => {
  const param = useParams();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${param.id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div
      className="bg-cover bg-center pt-5 min-h-lvh"
      style={{ backgroundImage: `url(${productBg})` }}
    >
      <div className="flex justify-center items-center h-screen w-2/3 m-auto relative">
        <div className="absolute flex top-7 left-7 text-white bg-yellow-700 border-2 border-transparent p-1 text-base hover:border-yellow-700 hover:bg-white hover:text-gray-500 rounded-md px-3.5 py-2.5 font-semibold shadow-sm">
          <IconArrowLeft size={26} strokeWidth={1.5} />
          <button type="button" onClick={() => navigate(-1)} className="">
            Go back
          </button>
        </div>
        <div className="flex w-1/2 h-3/5">
          <img
            src={product?.imageUrl[0]}
            alt="Product"
            className="mx-auto  object-cover object-center rounded-lg border-2 border-gray-500 drop-shadow"
          />
        </div>
        {/* Информация о товаре */}
        <div className="flex w-1/2 h-3/5 flex-col justify-around gap-3 m-7">
          <div>
            <h2 className="text-3xl m-2 text-center font-bold text-gray-900">{product?.name}</h2>
            <p className="text-yellow-900">{product?.category}</p>
          </div>
          <p className="text-gray-900">{product?.description}</p>
          <div className="flex justify-around">
            <p className="text-lg font-semibold mb-2">Price: {product?.price}$</p>
            <button className="text-white bg-yellow-700 border-2 border-transparent p-1 text-base hover:border-yellow-700 hover:bg-white hover:text-gray-500 rounded-md px-3.5 py-2.5 font-semibold shadow-sm">
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;