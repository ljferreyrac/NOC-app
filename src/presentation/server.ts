import { CheckService } from "../domain/use-cases/checks/check-server";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl( new FileSystemDataSource() )
const emailService = new EmailService();

export class Server {
    public static start () {
        console.log('Server started...');

        // Send email whit use case
        // new SendEmailLogs(emailService, fileSystemLogRepository).execute(['lferreyrac04@hotmail.com', 'leonardojesus2004@hotmail.com'])

        // Send email with service
        // const emailService = new EmailService(fileSystemLogRepository);
        // emailService.sendEmailWithFileSystemLogs(['lferreyrac04@hotmail.com', 'leonardojesus2004@hotmail.com'])

        // Cron creation
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'http://google.com'
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             ( error ) => console.log( error )
        //         ).execute(url);
        //     }
        // );
    }
}