import { Controller, Get, Query } from '@nestjs/common';
import { encryptData } from 'src/token';

@Controller('generate-webapp-url')
export class GenerateWebappUrlController {

    @Get()
    getUrl(@Query('user') user:string){
        const domain = 'http://localhost:4200/'
        if(!user) return
        const userId = Number(user)
        if(typeof userId != 'number') return
        const token = encryptData(Number(user))
        if(!token) return
        const url = `${domain}?token=${token}`
        return {url}
    }
}
