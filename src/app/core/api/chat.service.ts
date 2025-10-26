import { effect, inject, Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ActivatedRoute } from '@angular/router';
import { EChat } from '../../shared/enum/chat.enum';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { IChat } from '../../shared/interface/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {



  getHistory() {
    const token = this.getQueryParams('token')

    const headers = new HttpHeaders().set('token', token)
    return this.http.get<IChat[]>(EChat.url, { headers })
  }

  sendMessage(query:string){
    const token = this.getQueryParams('token')

    const headers = new HttpHeaders().set('token', token)
    return this.http.post<IChat>(EChat.url, {query},{ headers })
  }
}
