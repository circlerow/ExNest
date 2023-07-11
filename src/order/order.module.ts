import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from 'src/prisma.service';
import { SchedulingService } from './scheduling.service';
import { ScheduleModule } from '@nestjs/schedule';
import { Kafka } from 'kafkajs';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
    imports: [ScheduleModule.forRoot(), KafkaModule],
    controllers: [OrderController],
    providers: [OrderService, PrismaService, SchedulingService],
})
export class OrderModule { }
