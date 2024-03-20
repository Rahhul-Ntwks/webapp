const winston = require('winston');
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue'
  }
};

winston.addColors(customLevels.colors);

const logger = winston.createLogger({
  level: 'info',
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({ filename: 'logfile.log' }) // Log to a file named logfile.log
  ]
});

logger.error('This is an error message.');
logger.warn('This is a warning message.');
logger.info('This is an informational message.');
logger.debug('This is a debug message.');

logger.level = 'debug';

logger.debug('This is another debug message.');
module.exports = logger;
