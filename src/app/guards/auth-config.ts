


// src/app/auth-config.ts

export const msalConfig = {
  auth: {
    clientId: "61c28c74-d092-4c02-a355-bd828675b96b",
    authority: "https://login.microsoftonline.com/3033642d-6adf-4ac6-bbc5-511b42bc5f00",
    redirectUri: 'http://localhost:4200', // Adjust as needed
  },
  cache: {
    cacheLocation: 'localStorage'
  }
};

export const loginRequest = {
  scopes: ['user.read'] // Add required scopes
};

export const protectedResources = {
  api: {
    endpoint: 'https://graph.microsoft.com/v1.0/me',
    scopes: ['user.read']
  }
};
