import { Injectable } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { PrismaService } from './../prisma.service';
import { Order, Prisma } from '@prisma/client';
@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) { }
    getHello(): string {
        return 'Hello World!';
    }

    async create(orderDto: OrderDTO): Promise<Order> {
        return this.prisma.order.create({
            data: {
                name: orderDto.name,
                userID: orderDto.userID,
                status: 'Created',
            }
        });
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
