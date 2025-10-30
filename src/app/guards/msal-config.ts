

import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import {
  MSAL_INSTANCE,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';

export const msalConfig = {
  auth: {
    clientId: '61c28c74-d092-4c02-a355-bd828675b96b',
    authority: 'https://login.microsoftonline.com/3033642d-6adf-4ac6-bbc5-511b42bc5f00',
    redirectUri: 'http://localhost:5252',
  }
};

export function MSALInstanceFactory() {
  return new PublicClientApplication(msalConfig);
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    }
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}
