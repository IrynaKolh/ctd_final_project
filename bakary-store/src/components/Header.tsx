import React from 'react';
import Navigation from './Navigation';
import { Link, NavLink } from 'react-router-dom';
import logo from './../assets/logo.png';
import { IconLogin } from '@tabler/icons-react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-around items-center">
      <div>
        <NavLink to="/">
          <img src={logo} alt="HM Bakary" className="h-9 rounded" />
        </NavLink>
      </div>
      <Navigation />
      <Link to="/login">
        <button className="flex items-center text-gray-500 hover:text-yellow-700 hover:bg-gray-100 hover:border-yellow-700 p-1 rounded border-transparent border-2">
          <IconLogin size={26} strokeWidth={1.5} color="#6b7280" />
          Login
        </button>
      </Link>
    </header>
  );
};

export default Header;
