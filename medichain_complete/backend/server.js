const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const patientRoutes = require('./routes/patients'); // ⚠ make sure filename matches

const app = express();
app.use(cors());
app.use(express.json());

// Base route for patients
app.use('/patients', patientRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
