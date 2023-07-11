import { Injectable } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { PrismaService } from './../prisma.service';
import { Order, Prisma } from '@prisma/client';
import { ProducerService } from 'src/kafka/producer.service';
@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService,
        private readonly producerService: ProducerService) { }

    async getHello() {
        console.log('getHello');
        await this.producerService.produce({
            topic: 'test',
            messages: [
                { value: 'Hello Hello' },
            ],
        });
        return 'Success';
    }

    async create(orderDto: OrderDTO): Promise<Order> {

        await this.producerService.produce({
            topic: 'order',
            messages: [
                { key: 'name', value: orderDto.name },
                { key: 'email', value: orderDto.email },
                { key: 'userID', value: orderDto.userID.toString() }
            ],
        });

        const order = await this.prisma.order.create({
            data: {
                name: orderDto.name,
                userID: orderDto.userID,
                email: orderDto.email,
                status: 'Created',
            },
        });

        return order;
    }

    async changeStatus(orderID: number): Promise<Order> {
        return this.prisma.order.update({
            where: { id: orderID },
            data: { status: 'Cancelled' },
        });
    }

    async getStatus(orderID: number): Promise<String> {
        const order = await this.prisma.order.findUnique({
            where: { id: orderID },
        });
        return order.status;
    }

    async countElementsByStatus(): Promise<{ status: string, count: number }[]> {
        const result = await this.prisma.order.groupBy({
            by: ['status'],
            _count: {
                status: true
            }
        });
        console.log(result)
        return result.map(item => ({ status: item.status, count: item._count.status }));
    }
}
