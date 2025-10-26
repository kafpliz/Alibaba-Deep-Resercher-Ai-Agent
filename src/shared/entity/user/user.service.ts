import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entity/user/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    async createUser(userData: Partial<User>): Promise<User> {
        const user = this.userRepo.create(userData);
        return await this.userRepo.save(user)
    }

    async getUser(tg_id?: number | null, id?: number ): Promise<User | null> {
        if (tg_id) return await this.userRepo.findOneBy({ tg_id })
        else return await this.userRepo.findOneBy({ id })
    }

    async getAllUsers(): Promise<User[] | null> {
        return await this.userRepo.find({ relations: ['histories'] })
    }
}
