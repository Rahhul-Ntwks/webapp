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
    winston.format.printf(info => {
      const { timestamp, level, message, ...args } = info;
      const logObject = {
        timestamp,
        severity: level.toUpperCase(),
        message: message,
        ...args // Include additional properties
      };
      return JSON.stringify(logObject); // Return the log object as JSON string
    })
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
