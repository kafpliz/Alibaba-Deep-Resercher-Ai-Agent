import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from 'src/shared/entity/history/history';
import { HistoryService } from 'src/shared/entity/history/history.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([History]), UserModule],
    providers: [HistoryService],
    exports: [HistoryService]
})
export class HistoryModule {}
