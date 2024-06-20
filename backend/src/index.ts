import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
import fs from 'fs';
import csvParser from 'csv-parser';
import BigNumber from 'bignumber.js';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(bodyParser.json());

app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  
  const logData = {
    'date': new Date().toISOString(),
    'endpoint': 'POST /upload',
    ...req.file
  };

  console.log(logData);

  if (req.file) {
    let results = new BigNumber(0);

    fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (data) => {
      results = results.plus(new BigNumber(data['Total']));
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      console.log('Total:', results.toFixed(2));
      res.status(200).json({ response: results.toFixed(2) });
    })
    .on('error', (error) => {
      console.error('Error processing CSV file:', error);
      res.status(500).json({ error: 'Error processing CSV file' });
    });
  
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
