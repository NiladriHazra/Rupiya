// backend/index.js
require('dotenv').config({path: '/home/humi/Documents/100x dev/paytm/paytm/backend/.env'});
const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not defined

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", rootRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
