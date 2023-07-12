import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailProcessor } from './mail.processor';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'audio',
        }),
    ],
    controllers: [MailController],
    providers: [MailProcessor],
})
export class AudioModule { }