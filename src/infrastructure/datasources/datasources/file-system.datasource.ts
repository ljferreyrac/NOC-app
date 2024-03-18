import fs from "fs";
import { LogDataSource } from "../../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource {
    private readonly logsPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if( !fs.existsSync( this.logsPath ) ){
            fs.mkdirSync( this.logsPath );
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach( path => {
            if( fs.existsSync( path ) ) return;
            fs.writeFileSync( path, '' );
        })
    }

    async saveLog( newLog: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify(newLog) }\n`

        fs.appendFileSync( this.allLogsPath, logAsJson );

        if( newLog.level === LogSeverityLevel.low ) return;

        if( newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson )
        }
        else {
            fs.appendFileSync( this.highLogsPath, logAsJson )
        }
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf-8');
        if(content === '') return [];
        const logs = content.split('\n').filter(log => log != '').map(LogEntity.fromJson);

        return logs;
    }

    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch ( severityLevel ) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${ severityLevel } not implemented`);
        }
    }

}