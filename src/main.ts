import { bootstrapApplication } from '@angular/platform-browser';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  provideHttpClient,
  HttpClient,
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn,
  withInterceptors,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG
} from '@azure/msal-angular';
import {
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  AuthenticationResult,
  InteractionStatus
} from '@azure/msal-browser';
import { Subject, filter, takeUntil, switchMap, of } from 'rxjs';
import { SideNav } from './app/side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { environment } from './environments/environment';
import { routes } from './app/app.routes';

// === Azure AD Configuration ===
const msalConfig = {
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

const msalInstance = new PublicClientApplication(msalConfig);

const guardConfig = {
  interactionType: InteractionType.Redirect,
  authRequest: { scopes: ['user.read'] },
};

const interceptorConfig = {
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SideNav],
  template: `
    <ng-container *ngIf="!loginStatus">
      <button (click)="login()">Login with Microsoft</button>
    </ng-container>
    <ng-container *ngIf="loginStatus">
      <app-side-nav></app-side-nav>
    </ng-container>
  `,
})
export class App implements OnInit, OnDestroy {
  private msalService = inject(MsalService);
  private broadcastService = inject(MsalBroadcastService);
  private readonly destroying$ = new Subject<void>();
  jwtToken = '';
  loginStatus = false;

  ngOnInit() {
    this.msalService.instance
      .handleRedirectPromise()
      .then((result) => {
        if (result && result.account) {
          this.msalService.instance.setActiveAccount(result.account);
          this.storeToken(result);
        }
        this.setLoginDisplay();
      })
      .catch((err) => console.error('Redirect error:', err));

    this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this.destroying$)
      )
      .subscribe(() => this.setLoginDisplay());
  }

  storeToken(result: AuthenticationResult) {
    if (result && result.accessToken) {
      localStorage.setItem('jwt_token', result.accessToken);
      this.jwtToken = result.accessToken;
    }
  }

  setLoginDisplay() {
    const accounts = this.msalService.instance.getAllAccounts();
    this.loginStatus = accounts.length > 0;

    if (this.loginStatus) {
      const account = accounts[0];
      this.msalService.instance.setActiveAccount(account);
      this.acquireToken();
    }
  }

  acquireToken() {
    const account = this.msalService.instance.getActiveAccount();
    if (!account) return;

    this.msalService.acquireTokenSilent({ account, scopes: ['user.read'] }).subscribe({
      next: (result) => this.storeToken(result),
      error: (err) => console.error('Token acquire failed:', err),
    });
  }

  login() {
    this.msalService.loginRedirect({ scopes: ['user.read'] });
  }

  ngOnDestroy() {
    this.destroying$.next();
    this.destroying$.complete();
  }
}

msalInstance
  .initialize()
  .then(() => {
    bootstrapApplication(App, {
      providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor])),
        { provide: MSAL_INSTANCE, useValue: msalInstance },
        { provide: MSAL_GUARD_CONFIG, useValue: guardConfig },
        { provide: MSAL_INTERCEPTOR_CONFIG, useValue: interceptorConfig },
        MsalService,
        MsalBroadcastService,
      ],
    }).catch((err) => console.error(err));
  })
  .catch((err) => console.error('MSAL initialization failed:', err));
