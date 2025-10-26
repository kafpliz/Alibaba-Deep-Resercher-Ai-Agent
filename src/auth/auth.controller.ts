import { Controller, Get, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/shared/guards/token/token.guard';

@Controller('auth')
@UseGuards(TokenGuard)
export class AuthController {


    @Get('verify')
    isVerify() {
        return { statusCode: 200, mess: 'Success!' }
    }

}
