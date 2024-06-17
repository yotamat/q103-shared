const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(bodyParser.json());



app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file.path); // Output the path of the uploaded file to the console
    res.json({ response: 'Thanks!' }); // Send a fixed JSON response
});


app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});