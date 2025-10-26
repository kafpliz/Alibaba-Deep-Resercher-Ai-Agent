import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './/history';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class HistoryService {

    constructor(@InjectRepository(History) private historyRepo: Repository<History>, private userRepo:UserService) { }

    async addUserHistory(userID:number, question:string, answer:string){
        const user = await this.userRepo.getUser(null, userID)
        const history = new History()
        history.question = question;
        history.answer = answer
        if(user) history.user = user

        this.historyRepo.save(history)

    }

    async getUserHustory(userID:number){
        return this.historyRepo.find({where: {user: {id: userID}}, order: {id: 'DESC'}, take: 10} )
    }
    
}
