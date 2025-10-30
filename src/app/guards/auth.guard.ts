// app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

export const authGuard: CanActivateFn = (route, state) => {
  const msalService = inject(MsalService);
  const router = inject(Router);

  const isLoggedIn = msalService.instance.getActiveAccount() !== null;

  if (!isLoggedIn) {
    // Redirect to login
    msalService.loginRedirect({
      scopes: ['user.read']
    });
    return false;
  }

  return true;
};