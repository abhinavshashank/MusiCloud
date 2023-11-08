const express = require('express');
const app = express();
const port = 3000; // Choose a port number

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/songs'); // Store files in the public/songs folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('song'), (req, res) => {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    // Store the file path in your database, along with metadata
    const filePath = file.path; // This is the file path where it's stored on the server
    // Handle song metadata and database storage here
  
    res.json({ message: 'File uploaded successfully' });
});

 
const cors = require('cors');
app.use(cors());

