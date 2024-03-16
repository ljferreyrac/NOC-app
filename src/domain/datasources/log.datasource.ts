import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDataSource {
    abstract saveLog(newLog: LogEntity): Promise<void>;
    abstract getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}