import axios from 'axios';

export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'quckrg2l');

  const instance = axios.create();

  try {
    const response = await instance.post(
      'https://api.cloudinary.com/v1_1/dvpngv7cn/image/upload',
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
