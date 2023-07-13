import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('mail')
export class MailProcessor {
    constructor(private readonly mailerService: MailerService) { }
    @Process('sendmail')
    sendMail(job: Job<{ email: string, status: string }>) {
        this.mailerService.sendMail({
            to: `${job.data.email}`,
            from: 'noreply@gmail.com',
            subject: 'Notification',
            text: `Your order is ${job.data.status}`,
        }).then((res) => {
            console.log(res);
        }
        ).catch((err) => {
            console.log(err);
        }
        );
    }
}