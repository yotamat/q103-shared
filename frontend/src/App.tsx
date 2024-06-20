import { useState } from 'react';
import { Button, Container, Typography, Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface ResultType {
  response: string
}

const UploadAndDisplay = () => {
  const [data, setData] = useState<{ file: string, result: string, code: number }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    const response = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    });

    const result: ResultType = await response.json();
    
    setData(prevData => [...prevData, { file: file.name, result: result.response, code: response.status }]);
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box display="flex" flexDirection="column" alignItems="center" width="100%">
        <Typography variant="h4" gutterBottom>
          Upload and Display File
        </Typography>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden onChange={handleUpload} />
        </Button>
        {loading && <CircularProgress />}
        <TableContainer component={Paper} style={{ marginTop: 20, width: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>File</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.file}</TableCell>
                  <TableCell>{row.result}</TableCell>
                  <TableCell>{row.code}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default UploadAndDisplay;