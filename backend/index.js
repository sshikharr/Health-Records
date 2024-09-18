const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const healthRecordRoutes = require('./routes/healthRecordRoutes');
const authRoutes = require('./routes/authRoutes')
const cors = require('cors')

// Loading environment variables
dotenv.config();

// Connectting to MongoDB
db();

const app = express();

app.use(cors())

// Middleware for parsing JSON body
app.use(express.json());

// Middleware auth routes
app.use('/api/auth', authRoutes)

// Health record routes
app.use('/api/health-records', healthRecordRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
