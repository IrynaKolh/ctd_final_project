import React from 'react';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-400">
      <div className="w-3/4 m-auto flex justify-between items-center h-16">
        <div className="flex gap-2 items-center">
          <a href="https://github.com/IrynaKolh" target="_blank">
            <IconBrandGithub size={26} strokeWidth={1.5} color="#6b7280" />
          </a>
          <a href="https://www.linkedin.com/in/iryna-kolhanova/" target="_blank">
            <IconBrandLinkedin size={26} strokeWidth={1.5} color="#6b7280" />
          </a>
        </div>
        <div className="flex gap-3">
          <p className="text-gray-500 text-center text-lg">Iryna Kolhanova</p>
          <p className="text-gray-500 text-center text-lg">407-385-0125</p>
        </div>
        <div>
          <p className="text-gray-500 text-lg">© 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
