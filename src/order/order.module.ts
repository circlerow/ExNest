import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from 'src/prisma.service';
import { SchedulingService } from './scheduling.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [ClientsModule.register([
        {
            name: 'ORDER_SERVICE',
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'order',
                    brokers: ['localhost:9092'],
                },
                consumer: {
                    groupId: 'pay-consumer',
                },
            },
        },
    ]),
    ScheduleModule.forRoot(),
        MailModule, BullModule.registerQueue({
            name: 'mail',
        })
    ],
    controllers: [OrderController],
    providers: [OrderService, PrismaService, SchedulingService],
})
export class OrderModule { }
