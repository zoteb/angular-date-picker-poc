import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    return this.route.parseUrl('/login');
  }
}

/** NGv15 */
export const AuthGuardCanActivate: CanActivateFn = () => {
  const authService = inject(AuthService);
  const route = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  }
  return route.parseUrl('/login');
};
