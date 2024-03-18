import { LogModel } from "../../../data/mongo";
import { LogDataSource } from "../../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../../domain/entities/log.entity";

export class MongoDataSource implements LogDataSource {

    async saveLog(newLog: LogEntity): Promise<void> {
        const dbLog = await LogModel.create(newLog);
        console.log('Mongo Log created:', dbLog.id);
    }

    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel,
        });

        return logs.map(LogEntity.fromObject);
    }

}