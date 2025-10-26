import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BaseService } from './core/base.service';
/* import { marked } from 'marked'; */


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('client');

  #service = inject(BaseService)
 


  ngOnInit(): void {
   

  }


}
