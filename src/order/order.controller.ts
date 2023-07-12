import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get()
    getHello() {
        return this.orderService.getHello();
    }
    @EventPattern('pay')
    handleOrderCreated(data: any) {
        console.log(data);
        this.orderService.changeStatusOrder(data.id, data.status);
    }



    @Post('create')
    create(@Body() orderDto: OrderDTO) {
        return this.orderService.create(orderDto);
    }

    @Put('cancel')
    changeStatus(@Query('id') id) {
        return this.orderService.changeStatus(parseInt(id));
    }
    @Get('status')
    getStatus(@Query('id') id) {
        return this.orderService.getStatus(parseInt(id));
    }

    @Get('count')
    countElementsByStatus() {
        return this.orderService.countElementsByStatus();
    }
}
