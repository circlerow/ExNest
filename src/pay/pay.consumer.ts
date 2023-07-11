import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "src/kafka/consumer.service";

@Injectable()
export class PayConsumer implements OnModuleInit {
    private messages: any[] = [];

    constructor(private readonly consumerService: ConsumerService) { }

    async onModuleInit() {
        await this.consumerService.consume(
            {
                topics: ['order', 'test'],
            },
            {
                eachMessage: async ({ topic, partition, message }) => {
                    const value = message.value.toString();
                    const topicName = topic.toString();
                    const partitionNumber = partition.toString();

                    this.messages.push({ value, topic: topicName, partition: partitionNumber });

                    console.log(this.messages); // Log all messages received so far
                },
            }
        );
    }

    getAllMessages(): any[] {
        return this.messages;
    }
}
