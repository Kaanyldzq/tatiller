const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// CORS Ayarları
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://tatilim32.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes
const authRoutes = require('../routes/auth');
const hotelsRouter = require('../routes/hotels');
const bookingsRouter = require('../routes/bookings');
const reviewsRoutes = require('../routes/reviews');
const favoritesRoutes = require('../routes/favorites');
const campaignsRoutes = require('../routes/campaigns');
const feedbackRoutes = require('../routes/feedback');
const complaintsRoutes = require('../routes/complaints');

app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/campaigns', campaignsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/complaints', complaintsRoutes);

// API durumunu kontrol etmek için basit bir endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Tatilim API çalışıyor',
    status: 'online'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Bir şeyler ters gitti!' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
  console.log('API Endpoints:');
  console.log(`- Hotels: https://tatilim32.netlify.app/api/hotels`);
  console.log(`- Complaints: https://tatilim32.netlify.app/api/complaints`);
  console.log(`- Campaigns: https://tatilim32.netlify.app/api/campaigns`);
});
