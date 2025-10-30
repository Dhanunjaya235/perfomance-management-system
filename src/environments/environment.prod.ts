

// environments/environment.prod.ts
export const environment = {
  production: true,
  msalConfig: {
    clientId: 'prod-client-id',
    authority: 'https://login.microsoftonline.com/prod-tenant-id'
  }
};