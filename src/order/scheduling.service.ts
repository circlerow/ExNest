import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OrderService } from './order.service';


@Injectable()
export class SchedulingService {
    constructor(
        private readonly oderService: OrderService
    ) { }

    private readonly logger = new Logger(SchedulingService.name)
    @Cron('0 30 * * * *')
    handleCron() {
        this.logger.debug('Called when the current minute is 30');
        return this.oderService.countElementsByStatus();
    }

}