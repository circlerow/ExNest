import { Module } from '@nestjs/common';
import { PayConsumer } from './pay.consumer';
import { Kafka } from 'kafkajs';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
    imports: [KafkaModule],
    providers: [PayConsumer],
})
export class PayModule { }
