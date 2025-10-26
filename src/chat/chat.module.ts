import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { HistoryService } from 'src/shared/entity/history/history.service';
import { HistoryModule } from 'src/shared/entity/history/history.module';
import { UserModule } from 'src/shared/entity/user/user.module';

@Module({
    imports: [HistoryModule, UserModule],
    providers: [ChatService,]
})
export class ChatModule {}
