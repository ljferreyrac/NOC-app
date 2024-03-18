import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

export class PostgresDatasource implements LogDataSource {
    async saveLog(newLog: LogEntity): Promise<void> {
        const dbLog = await prismaClient.logModel.create({
            data: {...newLog, level: newLog.level.toUpperCase() as SeverityLevel}
        });
        console.log('Postgres Log created:', dbLog.id);
    }
    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await prismaClient.logModel.findMany({
            where: {
                level: severityLevel.toUpperCase() as SeverityLevel
            },
        });

        return logs.map(LogEntity.fromObject);
    }

}