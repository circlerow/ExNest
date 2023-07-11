import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from 'src/prisma.service';
import { SchedulingService } from './scheduling.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [ScheduleModule.forRoot()],
    controllers: [OrderController],
    providers: [OrderService, PrismaService, SchedulingService],
})
export class OrderModule { }
