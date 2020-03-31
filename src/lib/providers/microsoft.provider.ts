export interface MicrosoftConfig {
  // Mandatory
  clientId: string;
  scope: string;
  responseType: string;
  // Optional for user but default value set up by lib
  nonce?: string;
  tenant?: string;
  // Optional
  responseMode?: string;
  redirectUri?: string;
  loginHint?: string;
  domainHint?: string;
  prompt?: string;
}

export class MicrosoftProvider {

  constructor() {
  }

  getOauth2Endpoint(config) {
    let tenant = config.tenant;
    if (!tenant) {
      tenant = 'common';
    }

    const oauth2Endpoint = 'https://login.microsoftonline.com/' + tenant + '/oauth2/v2.0/authorize';
    return oauth2Endpoint;
  }

  // https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow
  getUserConsentParams(config: MicrosoftConfig): object {
    const params = {
      client_id: config.clientId,
      response_type: config.responseType,
      scope: config.scope,
      nonce: config.nonce
    };

    if (config.responseMode) {
      params['response_mode'] = config.responseMode;
    }
    if (config.redirectUri) {
      params['redirect_uri'] = config.redirectUri;
    }
    if (config.loginHint) {
      params['login_hint'] = config.loginHint;
    }
    if (config.domainHint) {
      params['domain_hint'] = config.domainHint;
    }
    if (config.prompt) {
      params['prompt'] = config.prompt;
    }
    if (config.tenant) {
      params['tenant'] = config.tenant;
    }

    return params;
  }
}


