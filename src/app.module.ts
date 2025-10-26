import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { DatabaseModule } from './shared/entity/database.module';
import { UserService } from './shared/entity/user/user.service';
import { HistoryService } from './shared/entity/history/history.service';
import { APP_GUARD } from '@nestjs/core';
import { TokenGuard } from './shared/guards/token/token.guard';
import { GenerateWebappUrlController } from './generate-webapp-url/generate-webapp-url.controller';
import { ChatModule } from './chat/chat.module';
import { HistoryModule } from './shared/entity/history/history.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    DatabaseModule,
    HistoryModule,
    ChatModule
  ],
  controllers: [AppController, ChatController, GenerateWebappUrlController, AuthController],
  providers: [AppService, ChatService, UserService, HistoryService],
})
export class AppModule {}
