require('dotenv').config();
const express = require('express');
const { logger, logEvents } = require('./middleware/logEvents');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/dbConnect');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const PORT = process.env.PORT || 3600; 

console.log(process.env.NODE_ENV)

connectDB();
//middlewares
app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
//static files
// app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

//routes
app.use('/', require('./routes/root'));
app.use('/users', require('./routes/api/usersRoute'));
app.use('/notes', require('./routes/api/notesRoute'));

//error handler
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ "error": "404 Not Found" });
  } else {
    res.type('txt').send("404 Not Found");
  }
})

app.use(errorHandler)

mongoose.connection.on('open', () => {
  console.log('Connected to DB');
  app.listen(PORT, () => {
    console.log(`Server run on PORT: ${PORT}`);
  })
})

mongoose.connection.on('error', (err) => {
  logEvents(`${err.code}`, 'mongoErrLog.txt');
})