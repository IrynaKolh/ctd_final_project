import React from 'react';
import { NavLink } from 'react-router-dom';

const navlinks = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Products',
    path: '/products',
  },
  {
    name: 'Blog',
    path: '/blog',
  },
];

const Navigation: React.FC = () => {
  return (
    <nav className="text-gray-500  h-10 text-lg flex items-center">
      {navlinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className="px-5 border-b-2 border-transparent hover:text-yellow-900 hover:border-yellow-700 hover:bg-gray-100"
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
