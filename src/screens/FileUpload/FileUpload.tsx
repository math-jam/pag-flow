// FileUpload.tsx
import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useDataContext } from '../../context/context';
import { fileUpload } from '../../services/fileUpload.service';

interface FileUploadProps {
  onFileUpload: (filename: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const { setData, setLoading } = useDataContext();

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setLoading(true);


    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await fileUpload(formData);
        setLoading(true)

        if (uploadResponse) {
          try {
            const getResponse = await axios.get('http://127.0.0.1:1810/api/data');
            setData(getResponse.data);
          } catch (getError) {
            console.error('Erro ao obter dados:', getError);
          }
        } else {
          console.error('Erro no upload:', uploadResponse);
        }
      } catch (error) {
        console.error('Erro no Upload:', error);
      }
    }

    setLoading(false);

  };

  return (
    <input type="file" onChange={handleFileUpload} />
  );
};

export default FileUpload;
