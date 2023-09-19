import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston'
// import 'winston-daily-rotate-file';

const { format, transports } = winston

// The File transport should really be the 'Stream' transport since it will accept any WritableStream. It is named such because it will also accept filenames via the 'filename' option:

// level: Level of messages that this transport should log.
// silent: Boolean flag indicating whether to suppress output.
// colorize: Boolean flag indicating if we should colorize output.
// timestamp: Boolean flag indicating if we should prepend output with timestamps (default true). If function is specified, its return value will be used instead of timestamps.
// filename: The filename of the logfile to write output to.
// maxsize: Max size in bytes of the logfile, if the size is exceeded then a new file is created, a counter will become a suffix of the log file.
// maxFiles: Limit the number of files created when the size of the logfile is exceeded.
// stream: The WriteableStream to write output to.
// json: If true, messages will be logged as JSON (default true).
// eol: string indicating the end-of-line characters to use (default to \n).
// prettyPrint: If true, additional JSON metadata objects that are added to logging string messages will be displayed as a JSON string representation. If function is specified, its return value will be the string representing the meta.
// depth Numeric indicating how many times to recurse while formatting the object with util.inspect (only used with prettyPrint: true) (default null, unlimited)
// logstash: If true, messages will be logged as JSON and formatted for logstash (default false).
// showLevel: Boolean flag indicating if we should prepend output with level (default true).
// formatter: If function is specified and json is set to false, its return value will be used instead of default output. (default undefined)
// tailable: If true, log files will be rolled based on maxsize and maxfiles, but in ascending order. The filenamewill always have the most recent log lines. The larger the appended number, the older the log file. This option requires maxFiles to be set, or it will be ignored.
// maxRetries: The number of stream creation retry attempts before entering a failed state. In a failed state the transport stays active but performs a NOOP on it's log function. (default 2)
// zippedArchive: If true, all log files but the current one will be zipped.
// options: options passed to fs.createWriteStream (default {flags: 'a'}).

export default WinstonModule.createLogger({
  transports: [
    new transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike(process.env.PRODUCT_LINE, {
          colors: true,
          prettyPrint: true
        }),
      )
    }),
    // new winston.transports.DailyRotateFile({
    //   dirname: `logs`, // 日志保存的目录
    //   filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
    //   datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
    //   zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
    //   maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
    //   maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
    //   // 记录时添加时间戳信息
    //   format: winston.format.combine(
    //     winston.format.timestamp({
    //       format: 'YYYY-MM-DD HH:mm:ss',
    //     }),
    //     winston.format.json(),
    //   ),
    // }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.json(),
      ),
      maxsize: 6291456, // 6MB
      maxFiles: 6,
    }),
    new transports.File({
      filename: 'logs/access.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.json(),
      ),
      maxsize: 6291456, // 6MB
      maxFiles: 6,
    })
  ]
})