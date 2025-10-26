import { Component, inject, OnInit } from '@angular/core';
import { ErrorService } from '../../core/service/error.service';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.scss'
})
export class Error implements OnInit {
  errService = inject(ErrorService)
  message:string | null = ''

  ngOnInit(){
    this.errService.errorSubject.subscribe(data=> {
      this.message = data
      
    })
  }
}
