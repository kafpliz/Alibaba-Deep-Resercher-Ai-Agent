import { Controller, Get, Query, Req ,Request} from '@nestjs/common';
import { AppService } from './app.service';
import { decryptData } from './token';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService,) {}

  @Get()
 async getHello(@Req() req:Request, @Query('token') token) {
    
  
    return {m: 'mess'}
  }
}
