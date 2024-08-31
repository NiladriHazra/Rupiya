// backend/index.js
require('dotenv').config({path: '/home/humi/Documents/100x dev/paytm/paytm/backend/.env'});
const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not defined

const app = express();
const allowedOrigins = [
    'http://localhost:5173',
    'https://rupiya-six.vercel.app',
  ];

  app.use(cors({
    origin: function (origin, callback) {
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

app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
