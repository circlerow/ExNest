import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('audio')
export class MailProcessor {
    private readonly logger = new Logger(MailProcessor.name);
    @Process('transcode')
    handleTranscode(job: Job): void {
        this.logger.debug('Start transcoding...');
        this.logger.debug(job.data);
        this.logger.debug('Transcoding completed');
    }
}