import { bootstrapApplication } from '@angular/platform-browser';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuard,
  MsalModule
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionStatus
} from '@azure/msal-browser';
import { Subject, filter, takeUntil, switchMap, of } from 'rxjs';
import { SideNav } from './app/side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { routes } from './app/app.routes';
import { authInterceptor, guardConfig, interceptorConfig, msalInstance } from './msal-config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SideNav,MsalModule],
  providers:[MsalGuard],
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
        MsalGuard
      ],
    }).catch((err) => console.error(err));
  })
  .catch((err) => console.error('MSAL initialization failed:', err));
