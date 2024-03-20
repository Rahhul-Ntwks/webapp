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

logger.error('This is an error message');
logger.warn('This is a warning message');
logger.info('This is an info message');
logger.debug('This is a debug message');


module.exports = logger;
