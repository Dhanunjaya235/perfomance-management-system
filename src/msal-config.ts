

import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import {
  MSAL_INSTANCE,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';
import {
  MsalService,
  MsalBroadcastService,
  MsalGuard,
  MsalModule
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  AuthenticationResult,
  InteractionStatus
} from '@azure/msal-browser';
import { Subject, filter, takeUntil, switchMap, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { environment } from './environments/environment';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';


export const msalConfig = {
  auth: {
    clientId: environment.mslConfig.clientId,
    authority: environment.mslConfig.authority,
    redirectUri: environment.mslConfig.redirectUri,
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // or SessionStorage
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const guardConfig = {
  interactionType: InteractionType.Redirect,
  authRequest: { scopes: ['user.read'] },
};

export const interceptorConfig = {
  interactionType: InteractionType.Redirect,
  protectedResourceMap: new Map([
    ['https://graph.microsoft.com/v1.0/me', ['user.read']],
  ]),
};

// === Custom Interceptor to attach JWT ===
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const msalService = inject(MsalService);
  const account = msalService.instance.getActiveAccount();

  if (!account) return next(req);

  return msalService.acquireTokenSilent({ account, scopes: ['user.read'] }).pipe(
    switchMap((result: AuthenticationResult) => {
      // ✅ store JWT token in localStorage/sessionStorage
      localStorage.setItem('jwt_token', result.accessToken);

      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${result.accessToken}`,
        },
      });
      return next(cloned);
    })
  );
};
