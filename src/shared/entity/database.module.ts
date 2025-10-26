import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Client } from 'pg'
import { DataSource } from 'typeorm';
import { User } from 'src/shared/entity/user/user';
import { History } from './history/history';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                await checkAndCreateDatabase(configService)
                return {
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: 'deep_resercher',
                    entities: [User, History],
                    synchronize: true,
                    logging: false
                }
            }

        }),
        TypeOrmModule.forFeature([User, History])
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule implements OnModuleInit {
    private readonly logger = new Logger(DatabaseModule.name)

    constructor(private dataSource: DataSource) { }

    async onModuleInit() {
        try {
            if (!this.dataSource.isInitialized) {
                await this.dataSource.initialize()
                this.logger.log('Database connected successfully')
            }
        } catch (error) {
            this.logger.log('Failed to connect to database', error)
            throw error

        }
    }

}


async function checkAndCreateDatabase(configService: ConfigService) {
    const DB_NAME = 'deep_resercher'

    const client = new Client({
        user: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        host: 'localhost',
        port: 5432,
        database: 'postgres'
    })

    try {
        await client.connect()

        const res = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [DB_NAME])
        if (res.rowCount == 0) {
            await client.query(`CREATE DATABASE ${DB_NAME}`);
        }


    } catch (error) {
        console.log(error);
    } finally {
        await client.end()
    }
}
