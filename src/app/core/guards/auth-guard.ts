import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../api/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)
  
  console.log(auth.isAuthenticated);

  if (auth.isAuthenticated) {
    return true
  }
  
  router.navigate(['/error'], )

  return false;
};
