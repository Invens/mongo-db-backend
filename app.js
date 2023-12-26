const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Category = require('./models/category'); // Import the Category model

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://ak9283026:OAazGqWzEOgnIzSK@cluster0.idvkcp5.mongodb.net/design', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Setup multer for handling file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/categories', upload.single('image'), async (req, res) => {
    try {
      const newCategory = req.body;
      const category = new Category(newCategory);
  
      // Handle the uploaded image
      const image = req.file;
      if (image) {
        category.items[0].image = `/uploads/${image.filename}`;
      }
  
      // Save to MongoDB
      await category.save();
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/api', (req, res) => {
  res.send('Hello from the API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});
