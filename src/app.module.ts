import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaService } from './prisma.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // hoặc địa chỉ IP của PostgreSQL container
      port: 5432,
      username: 'root',
      password: '123',
      autoLoadEntities: true,
      synchronize: true,
    }),
    OrderModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
