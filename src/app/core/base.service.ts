import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, OnInit, Optional, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  http = inject(HttpClient)
  @Optional() protected route = inject(ActivatedRoute)

  protected getQueryParams(key:string){
     let queryParams = '';
    this.route.queryParams.subscribe(params => {
      queryParams = params[key];
    });
    
    return queryParams;
  }

  

}
