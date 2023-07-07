import * as winston from "winston";

export const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    level: process.env.MOBILETTO_LOG_LEVEL || "error",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        /* eslint-disable @typescript-eslint/no-explicit-any */
        winston.format.printf((info: any) => {
            /* eslint-enable @typescript-eslint/no-explicit-any */
            return `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`;
        })
    ),
    transports: process.env.MOBILETTO_LOG_FILE
        ? [
              new winston.transports.File({
                  filename: process.env.MOBILETTO_LOG_FILE,
              }),
          ]
        : [
              new winston.transports.Console({
                  stderrLevels: Object.keys(winston.config.npm.levels),
              }),
          ],
});

export const setLogLevel = (level: string) => {
    logger.level = level;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const setLogTransports = (transports: any[]) => {
    /* eslint-enable @typescript-eslint/no-explicit-any */
    logger.transports.splice(0, logger.transports.length);
    logger.transports.push(...transports);
};
