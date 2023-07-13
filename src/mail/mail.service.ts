import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }
    sendMail(email: string, status: string) {
        this.mailerService.sendMail({
            to: `${email}`,
            from: 'noreply@gmail.com',
            subject: 'Notification',
            text: `Your order is ${status}`,
        }).then((res) => {
            console.log(res);
        }
        ).catch((err) => {
            console.log(err);
        }
        );
    }
}
