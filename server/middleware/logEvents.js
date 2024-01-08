const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async (message, fileName) => {
  const date = format(new Date(), 'dd/MM/yy\tHH:mm');
  const logItem = `${message}\t${uuid()}\t${date}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', fileName), logItem)
  } catch (err) {
    console.log(err.message)
  }
}

const logger = (req, _, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLogs.txt');
  next();
}

module.exports = {
  logger,
  logEvents
}