require('dotenv').config();
const express = require('express');
const { logger } = require('./middleware/logEvents');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/dbConnect');
const app = express();

connectDB();
const PORT = process.env.PORT || 3500;
//middlewares
app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
//static files
app.use('/', express.static(path.join(__dirname, '/public')))

//routes
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));

//error handler
app.use('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

mongoose.connection.once('open', () => {
  console.log('Connected to DB');
  app.listen(PORT, () => {
    console.log(`Server run on PORT: ${PORT}`);
  })
})