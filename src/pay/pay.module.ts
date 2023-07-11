import { Module } from '@nestjs/common';
import { PayConsumer } from './pay.consumer';
import { Kafka } from 'kafkajs';
import { KafkaModule } from 'src/kafka/kafka.module';
import { PayService } from './pay.service';

@Module({
    imports: [KafkaModule],
    providers: [PayConsumer, PayService],
})
export class PayModule { }
