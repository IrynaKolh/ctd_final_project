import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="text-gray-500 font-semibold h-10">
      <NavLink
        end
        to="/"
        className="px-5 border-b-2 border-transparent hover:text-purple-500 hover:border-purple-500"
      >
        Home
      </NavLink>
      <NavLink
        to="/products"
        className="px-5 border-b-2 border-transparent hover:text-purple-500 hover:border-purple-500"
      >
        Products
      </NavLink>
      <NavLink
        to="/my-store"
        className="px-5 border-b-2 border-transparent hover:text-purple-500 hover:border-purple-500"
      >
        My Store
      </NavLink>
    </nav>
  );
};

export default Navigation;
