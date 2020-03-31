export interface GoogleConfig {
  // Mandatory
  clientId: string;
  scope: string;
  responseType: string;
  redirectUri: string;
  // Optional for user but default value set up by lib
  nonce?: string;
  // Optional
  includeGrantedScopes?: boolean;
  loginHint?: string;
  prompt?: string;
}

export class GoogleProvider {

  constructor() {
  }

  getOauth2Endpoint() {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    return oauth2Endpoint;
  }

  // https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
  getUserConsentParams(config: GoogleConfig): object {
    const params = {
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope,
      response_type: config.responseType,
      nonce: config.nonce
    };

    if (config.includeGrantedScopes) {
      params['include_granted_scopes'] = config.includeGrantedScopes;
    }
    if (config.loginHint) {
      params['login_hint'] = config.loginHint;
    }
    if (config.prompt) {
      params['prompt'] = config.prompt;
    }

    return params;
  }
}
