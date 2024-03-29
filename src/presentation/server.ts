import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-server";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-server-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoDataSource } from "../infrastructure/datasources/mongo.datasource";
import { PostgresDatasource } from "../infrastructure/datasources/postgres.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl( 
    new FileSystemDataSource() 
)

const mongoLogRepository = new LogRepositoryImpl( 
    new MongoDataSource()
)

const postgresLogRepository = new LogRepositoryImpl( 
    new PostgresDatasource()
)
const emailService = new EmailService();

export class Server {
    public static async start () {
        console.log('Server started...');

        // Send email whit use case
        // new SendEmailLogs(emailService, fileSystemLogRepository).execute(['lferreyrac04@hotmail.com', 'leonardojesus2004@hotmail.com'])

        // Send email with service
        // const emailService = new EmailService(fileSystemLogRepository);
        // emailService.sendEmailWithFileSystemLogs(['lferreyrac04@hotmail.com', 'leonardojesus2004@hotmail.com'])

        // const logs = await logRepository.getLog(LogSeverityLevel.low);
        // console.log(logs);
        // Cron creation
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'http://google.com'
                new CheckServiceMultiple(
                    [ fsLogRepository, mongoLogRepository, postgresLogRepository ],
                    () => console.log(`${url} is ok`),
                    ( error ) => console.log( error )
                ).execute(url);
            }
        );
    }
}