import { ConsoleLogger, Injectable } from '@nestjs/common';
import moment from 'moment';
import { Logger, QueryRunner } from 'typeorm';

@Injectable()
export class MyLogger extends ConsoleLogger implements Logger {
  error(message: any, stack?: string, context?: string) {
    const currentDate = new Date();
    // add your tailored logic here
    //  super.error(`${message} -> (${stack || 'trace not provided !'})`, {
    //  timestamp: currentDate.toISOString(),
    // context: this.context});
    this.formatedLog(
      'error',
      `${message} -> (${stack || 'trace not provided !'})`,
      context,
      stack,
    );
  }

  log(message: string, context?: string) {
    this.formatedLog('info', message, context);
  }

  warn(message: string, context?: string) {
    this.formatedLog('warn', message, context);
  }
  debug(message: any, context?: string) {
    if (process.env.NODE_ENV !== 'production')
      this.formatedLog('debug', message, context);
  }

  private formatedLog(level: string, message: string, context, error?): void {
    let result = '';
    // const color = chalk.default;
    const dateFormat = moment().format('DD/MM/YYYY');
    const timeFormat = moment().format('h:mm:ss a');
    const time = `${dateFormat}|${timeFormat}`;

    switch (level) {
      case 'info':
        result = `${time}|INFO|${context}|${message}`;
        break;
      case 'error':
        result = `${time}|ERROR|${context}|${message}`;
        break;
      case 'warn':
        result = `${time}|WARN|${context}|${message}`;
        break;
      case 'debug':
        result = `${time}|DEBUG|${context}|${message}`;
      default:
        break;
    }
    console.log(result);
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.formatedLog(
      'info',
      query + 'params: ' + JSON.stringify(parameters),
      MyLogger.name,
    );
  }
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {
    this.formatedLog(
      'error',
      query + 'params: ' + JSON.stringify(parameters) + 'error: ' + error,
      MyLogger.name,
      error,
    );
  }
  /**
   * Logs query that is slow.
   */
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {
    this.formatedLog(
      'warn',
      query +
        'params: ' +
        JSON.stringify(parameters) +
        'took longer time' +
        time,
      MyLogger.name,
    );
  }
  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    this.formatedLog('debug', message, MyLogger.name);
  }
  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string, queryRunner?: QueryRunner): any {
    this.formatedLog('debug', message, MyLogger.name);
  }
}
