import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entity/user/user';
import { UserService } from 'src/shared/entity/user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
