import { Inject, Injectable } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { PrismaService } from './../prisma.service';
import { Order, Prisma } from '@prisma/client';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';
@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService,
        @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka) { }

    async getHello() {
        console.log('getHello');
        return 'Success';
    }

    async create(orderDto: OrderDTO): Promise<Order> {

        const order = await this.prisma.order.create({
            data: {
                name: orderDto.name,
                userID: orderDto.userID,
                email: orderDto.email,
                status: 'Created',
            },
        });

        this.orderClient.emit(
            'order',
            new OrderCreatedEvent(order.id, orderDto.name, orderDto.userID, orderDto.email),
        );
        return order;
    }

    async changeStatus(orderID: number): Promise<Order> {
        return this.prisma.order.update({
            where: { id: orderID },
            data: { status: 'Cancelled' },
        });
    }
    async changeStatusOrder(orderID: number, status: string): Promise<Order> {
        console.log("change!!");
        return this.prisma.order.update({
            where: { id: orderID },
            data: { status: status },
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
