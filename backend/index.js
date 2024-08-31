require('dotenv').config({path: '/home/humi/Documents/100x dev/paytm/paytm/backend/.env'});
const express = require('express');
const cors = require('cors');
const rootRouter = require('./routes/index');
const port = process.env.PORT || 3000;

const app = express();

// List of allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://rupiya-six.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    console.log('Origin:', origin); // Log origin to debug
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());
app.use('/api/v1', rootRouter);

// Handle OPTIONS preflight requests
app.options('*', cors({
  origin: function (origin, callback) {
    console.log('Options Origin:', origin); // Log origin to debug
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
