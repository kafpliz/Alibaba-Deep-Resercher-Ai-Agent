import { Body, Controller, Get, Post, Req, Request, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { QueryDTO } from './chat.dto';
import { ChatService } from './chat.service';
import { TokenGuard } from 'src/shared/guards/token/token.guard';

@Controller('chat')
@UseGuards(TokenGuard)
@UsePipes(new ValidationPipe())

export class ChatController {

    constructor(private service:ChatService){}

    @Post()
    async chat(@Body() body:QueryDTO, @Req() req:Request){
        const userID = Number(req['user'].id)
        
        return this.service.sendRequest(body.query, userID)
    }

    @Get()
    async history(@Req() req:Request){
        const userID = Number(req['user'].id)
        return this.service.chatHistory(userID)
    }
}
