const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./api/routes/auth');
const apiRoutes = require('./api/routes/api');
const cors = require("cors");
const env = require('dotenv').config();
const app = express();
const port = process.env.PORT || "https://pizo-dance.vercel.app/";

// Middleware
const allowedOrigins = ['https://your-client-domain.com', 'http://localhost:5500','*'];
const corsOptions = {
  origin: 'http://localhost:5500/client/SignIn.html', // Replace with the actual client-side domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
};

app.use(cors());
// app.use(cors(corsOptions));

app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URL, )
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

const voltageSchema = new mongoose.Schema({
  voltage: Number,
  
},{timestamps: true});

// Model for voltage data
const Voltage = mongoose.model('Voltage', voltageSchema);

// Route to receive voltage data from Arduino
app.post('/api/data', async (req, res) => {
  try {
    const  {voltage}  = req.body;
    await Voltage.create({ voltage }); // Store voltage data in MongoDB
    res.status(201).send('Voltage data stored successfully.'+{voltage});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error storing voltage data.');
  }
});
// Get all the recorded voltage data
app.get('/api/data', async (req, res) => {
  try {
    const data = await Voltage.find().sort({ timestamp: 1 }).lean();
    res.json(data);
  } catch (error) {
    console.error('Error fetching voltage data:', error);
    res.status(500).send('Error fetching voltage data');
  }
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});