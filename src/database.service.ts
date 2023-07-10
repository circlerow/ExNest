import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    constructor(@InjectConnection() private connection: Connection
    ) { }

    async onModuleInit() {
        try {
            console.log('Connected to the database');
        } catch (error) {
            console.error('Failed to connect to the database:', error);
        }
    }
    async onModuleDestroy() {
        await this.connection.close();
    }
}