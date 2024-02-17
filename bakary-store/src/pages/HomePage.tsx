import React from 'react';
import hero from '../assets/hero2.png';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <img src={hero} alt="hero" className="object-cover object-center" />
      </div>
      <h2 className="text-3xl font-bold">HomePage</h2>
    </div>
  );
};

export default HomePage;
