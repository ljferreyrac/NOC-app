import { CheckService } from "../domain/use-cases/checks/check-server";
import { FileSystemDataSource } from "../infrastructure/datasources/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl( new FileSystemDataSource() )

export class Server {
    public static start () {
        console.log('Server started...');
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'http://localhost:3000'
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is ok`),
                    ( error ) => console.log( error )
                ).execute(url);
            }
        );
    }
}