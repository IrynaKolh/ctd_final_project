import React from 'react';
import Navigation from './Navigation';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from './../assets/logo.png';
import { IconLogin, IconUser } from '@tabler/icons-react';
// import { isUserLogined } from '../utils/helpers';
import { useAuth } from '../utils/useAuth';

const Header: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.clear();
    logout();
    navigate('/login');
  };

  return (
    <header className="my-header flex justify-around items-center sticky top-0 z-50 bg-white h-16 border-b border-gray-400">
      <div>
        <NavLink to="/">
          <img src={logo} alt="HM Bakary" className="rounded h-14" />
        </NavLink>
      </div>

      <Navigation />

      {user ? (
        <div className="flex justify-end items-center gap-1">
          {user.user.isSeller ? (
            <Link to="/my-store">
              <button
                type="button"
                className="text-white bg-yellow-700 border-2 border-transparent p-1 rounded text-base hover:border-yellow-700 hover:bg-white hover:text-gray-500"
              >
                My Store
              </button>
            </Link>
          ) : (
            <Link to="/seller">
              <button
                type="button"
                className="text-white bg-yellow-700 border-2 border-transparent p-1 rounded text-base hover:border-yellow-700 hover:bg-white hover:text-gray-500"
              >
                Become a seller
              </button>
            </Link>
          )}
          <button
            type="button"
            onClick={logoutUser}
            className="flex items-center text-gray-500 hover:text-yellow-700 hover:bg-gray-100 hover:border-yellow-700 p-1 rounded border-transparent border-2"
          >
            <IconUser size={26} strokeWidth={1.5} color="#6b7280" />
            Logout
          </button>
        </div>
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
