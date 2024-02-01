import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from './../assets/logo.png';
import { IconLogin, IconUser } from '@tabler/icons-react';
import { isUserLogined } from '../utils/helpers';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoggedInStatus = isUserLogined();
    setIsLoggedIn(!!storedLoggedInStatus);
  }, [isLoggedIn]);

  return (
    <header className="flex justify-around items-center">
      <div>
        <NavLink to="/">
          <img src={logo} alt="HM Bakary" className="h-9 rounded" />
        </NavLink>
      </div>

      <Navigation />

      {isLoggedIn ? (
        <button
          type="button"
          onClick={logout}
          className="flex items-center text-gray-500 hover:text-yellow-700 hover:bg-gray-100 hover:border-yellow-700 p-1 rounded border-transparent border-2"
        >
          <IconUser size={26} strokeWidth={1.5} color="#6b7280" />
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className="flex items-center text-gray-500 hover:text-yellow-700 hover:bg-gray-100 hover:border-yellow-700 p-1 rounded border-transparent border-2">
            <IconLogin size={26} strokeWidth={1.5} color="#6b7280" />
            Login
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;
