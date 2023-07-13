import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('mail')
export class MailController {
    constructor(@InjectQueue('mail') private readonly mailQueue: Queue) { }


    @Post('sendmail')
    async transcode() {
        console.log('sendmail');
        await this.mailQueue.add('sendmail', {
            email: 'a@gmail.com',
            status: 'a',
        });
    }
}