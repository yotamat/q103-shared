import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
import fs from 'fs';
import csvParser from 'csv-parser';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(bodyParser.json());

app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (req.file) {
    console.log(req.file.path); // Output the path of the uploaded file to the console
    res.json({ response: 'Thanks!' }); // Send a fixed JSON response
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
