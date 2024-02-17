import React, { useEffect } from 'react';

interface MessegeInfoProps {
  onClose: () => void;
  message: string | null;
}
const MessegeInfo: React.FC<MessegeInfoProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [onClose]);
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        right: '50%',
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: '10',
      }}
    >
      <p>{message}</p>
    </div>
  );
};

export default MessegeInfo;
