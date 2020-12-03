const appRoot = require('app-root-path');
const winston = require('winston');
require('winston-daily-rotate-file');

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app-%DATE%.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const fileRotateTransport = new (winston.transports.DailyRotateFile)({
    dirname: `${appRoot}/logs/`,
    filename: 'app-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    zippedArchive: true,
    level: 'debug'
});

const console = new (winston.transports.Console)({
    level: 'debug',
    colorize: true
});


const logger = winston.createLogger({
    transports: [
        fileRotateTransport,
        console
    ]
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;
