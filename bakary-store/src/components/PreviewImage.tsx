import React, { useEffect, useState } from 'react';

const PreviewImage: React.FC<{ file: File }> = ({ file }) => {
  const [preview, setPreview] = useState<string | undefined>();

  useEffect(() => {
    const reader = new FileReader();
    if (file instanceof Blob) {
      reader.onload = () => {
        setPreview(reader.result as string);
        console.log(preview);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div className="w-36 h-36 mx-auto">
      {preview && (
        <img className="w-36 h-36 object-cover object-center" src={preview} alt="product image" />
      )}
    </div>
  );
};

export default PreviewImage;
