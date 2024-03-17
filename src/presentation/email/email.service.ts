import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor(){}

    async sendEmail(options: SendMailOptions):Promise<boolean>{
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });

        } catch (error) {
            return false            
        }

        return true
    }

    sendEmailWithFileSystemLogs( to: string | string[]){
        const subject = 'Logs del servidor';
        const htmlBody = `
        <h3>Logs de sistema - NOC</h3>
        <p>Est labore velit anim cillum consectetur qui occaecat excepteur proident.</p>
        <p>Ver logs adjuntos</p>
        `;
        const attachments: Attachment[] = [
            {
                filename: 'logs-all.log',
                path: './logs/logs-all.log'
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log'
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log'
            },
        ];

        return this.sendEmail({
            to, subject, attachments, htmlBody
        })
    }
}