import { useState } from 'react';

const UploadAndDisplay = () => {
  const [data, setData] = useState([]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    setData(result);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default UploadAndDisplay;
