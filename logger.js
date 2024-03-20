const winston = require('winston');




const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: 'logfile.log' })
  ]
});

// Set the logger level to debug
logger.level = 'debug';

// Log a message with an object
const exampleObject = {
  key1: 'value1',
  key2: 'value2'
};
logger.debug('Logging an object:', exampleObject);

module.exports = logger;
