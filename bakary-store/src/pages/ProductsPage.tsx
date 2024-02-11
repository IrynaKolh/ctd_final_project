import React, { useEffect, useState } from 'react';
// import productBg from '../assets/product-bg.jpg';
import { ProductResponse } from '../models/interfaces';
import axios from 'axios';
import Pagination from '../components/Pagination';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductResponse[] | []>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data.products);
        setAmount(response.data.count);
      } catch (error) {
        console.error('Error fetching shop info:', error);
      }
    };

    getProducts();
  }, []);

  //style={{ backgroundImage: `url(${productBg})` }}

  return (
    <div className="bg-cover bg-center min-h-lvh">
      <div className="mx-auto max-w-2xl p-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product._id} className="group relative bg-gray-200 drop-shadow-lg rounded-md">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-grey-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageUrl[0]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="m-4 flex justify-between">
                <div>
                  <h3 className="text-md text-gray-700 font-bold">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name.trim()}
                    </a>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}$</p>
              </div>
            </div>
          ))}
        </div>
        <Pagination totalPages={amount} currentPage={1} />
      </div>
    </div>
  );
};

export default ProductsPage;
