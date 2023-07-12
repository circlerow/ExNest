import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OrderModule } from './order/order.module';

async function bootstrap() {
  const orderMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'order-consumer',
        },
      },
    },
  );
  const app = await NestFactory.create(AppModule);
  app.listen(3000);
  await orderMicroservice.listen();
}
bootstrap();
