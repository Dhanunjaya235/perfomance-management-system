// app/interceptors/msal.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { catchError, switchMap, from } from 'rxjs';

export const msalInterceptor: HttpInterceptorFn = (req, next) => {
  const msalService = inject(MsalService);
  const account = msalService.instance.getActiveAccount();

  if (!account) {
    return next(req);
  }

  // Get the scopes for this request
  const scopes = ['user.read']; // Add your required scopes

  return from(
    msalService.instance.acquireTokenSilent({
      scopes,
      account
    })
  ).pipe(
    switchMap(response => {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${response.accessToken}`
        }
      });
      return next(clonedRequest);
    }),
    catchError(error => {
      console.error('Token acquisition failed', error);
      return next(req);
    })
  );
};