import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { HistoryModule } from 'src/shared/entity/history/history.module';
import { UserModule } from 'src/shared/entity/user/user.module';

@Module({
    imports: [HistoryModule, UserModule],
    providers: [ChatService,]
})
export class ChatModule {}
