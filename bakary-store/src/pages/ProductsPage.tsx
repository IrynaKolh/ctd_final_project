import React, { useEffect, useState } from 'react';
import { ProductResponse } from '../models/interfaces';
import axios from 'axios';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import Sorting from '../components/Sorting';
import Filters from '../components/Filters';
import { Link } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductResponse[] | []>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [amount, setAmount] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [sortInput, setSortInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (searchTerm: string) => {
    setSearchInput(searchTerm);
  };

  const onSort = (sortTerm: string) => {
    setSortInput(sortTerm);
  };

  const handlePage = (pageTerm: number) => {
    setCurrentPage(pageTerm);
  };

  const handleFilter = (filterTerm: string) => {
    setSelectedCategory(filterTerm);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products?name=${searchInput}&category=${selectedCategory}&sort=${sortInput}&page=${currentPage}&limit=12`
        );
        setProducts(response.data.products);
        setAmount(response.data.count);
        console.log(response.data.count);
      } catch (error) {
        console.error('Error fetching shop info:', error);
      }
    };

    getProducts();
  }, [searchInput, sortInput, currentPage, selectedCategory]);

  return (
    <div className="bg-cover bg-center min-h-lvh">
      <div className="mx-auto max-w-2xl p-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-4">
        <div className="flex gap-3 text-gray-500">
          <Search onSearch={handleSearch} />
          <Sorting onSort={onSort} />
          <Filters onFilter={handleFilter} />
        </div>

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
              <div className="m-4 flex justify-between gap-2">
                <div>
                  <h3 className="text-md text-gray-700 font-bold">
                    <Link to={`/products/${product._id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name.trim()}
                    </Link>
                  </h3>
                </div>
                <p className="text-sm font-medium text-yellow-900">{product.price}$</p>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          totalPages={Math.ceil(amount / 12)}
          currentPage={currentPage}
          onPageChange={handlePage}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
