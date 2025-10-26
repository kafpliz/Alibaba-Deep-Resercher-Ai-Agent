import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseService } from '../base.service';
import { EAuth } from '../../shared/enum/auth.enum';
import { HttpHeaders } from '@angular/common/http';
import { ErrorService } from '../service/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)
  public isAuthenticated = false
  private errorService = inject(ErrorService)

  initializeAuthentication(): Promise<boolean> {
    
    return new Promise((resolve) => {
      try {
        const token = this.getToken()
        
        if (!token) {
          this.setAuthState(false)
          this.errorService.showError('Нет доступа')
          resolve(false)
          return
        }
        
        const headers = new HttpHeaders().set('token', token)
        this.http.get(EAuth.verify, { headers }).subscribe({
          next: (res) => {
            this.setAuthState(true)
            resolve(true)
          },
          error: (err) => {

            this.setAuthState(false)
            this.errorService.showError(err.message)
            resolve(false)
          }
        })

      } catch (error) {
        console.error(error)
      }

    })
  }

  private setAuthState(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated
    this.isAuthenticatedSubject.next(isAuthenticated)
  }

  private getToken(): string | null {
    const url = new URL(window.location.href)
    return url.searchParams.get('token')
  }
}
