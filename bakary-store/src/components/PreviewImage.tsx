import React, { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PreviewImage: React.FC<any> = ({ file }) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('');
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  return (
    <div className="w-36 h-36 mx-auto">
      {preview && (
        <img
          className="w-36 h-36 object-cover object-center"
          src={preview.toString()}
          alt="product image"
        />
      )}
    </div>
  );
};

export default PreviewImage;
