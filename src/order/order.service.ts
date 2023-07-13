import { Inject, Injectable } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { PrismaService } from './../prisma.service';
import { Order, Prisma } from '@prisma/client';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService,
        @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka,
        @InjectQueue('mail') private readonly mailQueue: Queue) { }

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
        await this.mailQueue.add('sendmail', {
            email: orderDto.email,
            status: 'Created',
        });

        this.orderClient.emit(
            'order',
            new OrderCreatedEvent(order.id, orderDto.name, orderDto.userID, orderDto.email),
        );
        return order;
    }

    async changeStatus(orderID: number): Promise<Order> {
        const user = await this.prisma.order.findUnique({
            where: { id: orderID },
        })
        const email = user.email;
        await this.mailQueue.add('sendmail', {
            email: email,
            status: 'Cancelled',
        });
        return this.prisma.order.update({
            where: { id: orderID },
            data: { status: 'Cancelled' },
        });
    }
    async changeStatusOrder(orderID: number, status: string): Promise<Order> {
        console.log("change!!");
        const user = await this.prisma.order.findUnique({
            where: { id: orderID },
        })
        const email = user.email;
        await this.mailQueue.add('sendmail', {
            email: email,
            status: status,
        });
        await this.prisma.order.update({
            where: { id: orderID },
            data: { status: status },
        })
        await this.delivered(orderID, status);

        return;
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

    async delivered(orderID: number, status: string): Promise<Order> {
        const user = await this.prisma.order.findUnique({
            where: { id: orderID },
        })
        const email = user.email;
        if (status == 'Cancelled') {
            return
        }
        else if (status == 'Confirmed') {
            const random = Math.floor(Math.random() * 100);
            if (random < 5) {
                await this.mailQueue.add('sendmail', {
                    email: email,
                    status: 'Cancelled',
                });
                return this.prisma.order.update({
                    where: { id: orderID },
                    data: { status: 'Cancelled' },
                });
            }
            else {
                const currentDate = new Date();
                const currentTimeString = currentDate.toTimeString();
                console.log("Đơn hàng bắt đầu giao lúc:", currentTimeString);

                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        const currentDate1 = new Date();
                        const currentTimeString1 = currentDate1.toTimeString();
                        console.log("Đơn hàng " + orderID + " đã được giao thành công lúc:", currentTimeString1);
                        resolve();
                    }, 10000);
                });

                await this.mailQueue.add('sendmail', {
                    email: email,
                    status: 'Delivered',
                });
                return this.prisma.order.update({
                    where: { id: orderID },
                    data: { status: 'Delivered' },
                });
            }

        }
    }

}
