import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';

const LoginPage: React.FC = () => {
  const [view, setView] = useState('login');
  return (
    <div className="flex items-center justify-center flex-col max-w-7xl w-96 m-auto border-gray-200 border-2 rounded-md p-3 text-gray-500">
      <nav className="flex w-full justify-around">
        <h3
          onClick={() => setView('login')}
          style={{
            color: view === 'login' ? '#a16207' : '#6b7280',
            background: view === 'login' ? '#fff' : '#f3f4f6',
            width: '50%',
          }}
        >
          Login
        </h3>
        <h3
          onClick={() => setView('registration')}
          style={{
            color: view === 'login' ? '#6b7280' : '#a16207',
            background: view === 'login' ? '#f3f4f6' : '#fff',
            width: '50%',
          }}
        >
          Registration
        </h3>
      </nav>
      {view === 'login' ? <LoginForm /> : <RegistrationForm />}
    </div>
  );
};

export default LoginPage;
