// backend/index.js
require('dotenv').config()
const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");
const port = 3000
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(process.env.PORT);