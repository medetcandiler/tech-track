const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}`, 'errLogs.txt')
  console.error(err.stack);

  const status = res.status ? res.status : 500;

  res.status(status).json({ message: 'Something broke!' });

  next(err);
}

module.exports = errorHandler;