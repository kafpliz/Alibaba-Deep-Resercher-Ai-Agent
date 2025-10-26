import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'src/shared/entity/user/user.service';
import { observeToken, decryptData } from 'src/token';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private userServ: UserService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest()

    const token = req.headers['token']

    if (!token) return false
    console.log('TOKEN:', token);

    const tokenData = decryptData(token)
    const checkToken = tokenData ? observeToken(tokenData) : false

    if (!checkToken) return false

    const hasUser = await this.userServ.getUser(tokenData!.userId)

    if (!hasUser) return false

    
    req['user'] = {
      tg_id: tokenData!.userId,
      id: hasUser.id
    }
    return true;
  }
}
