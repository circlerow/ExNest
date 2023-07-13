import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailProcessor } from './mail.processor';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'mail',
        }),
        MailerModule.forRoot({
            transport: {
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "6042ce34503b97",
                    pass: "607f1f8c6e5fa0"
                },
            },
        }),

    ],
    controllers: [MailController],
    providers: [MailProcessor],
    exports: [MailProcessor],
})
export class MailModule { }