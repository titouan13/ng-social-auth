export interface FacebookConfig {
  // Mandatory
  clientId: string;
  redirectUri: string;
  // Optional
  responseType?: string;
  scope?: string;
}

export class FacebookProvider {

  constructor() {
  }

  getOauth2Endpoint() {
    const oauth2Endpoint = 'https://www.facebook.com/v6.0/dialog/oauth';
    return oauth2Endpoint;
  }

  // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/
  getUserConsentParams(config: FacebookConfig): object {
    const params = {
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
    };

    if (config.responseType) {
      params['response_type'] = config.responseType;
    }
    if (config.scope) {
      params['scope'] = config.scope;
    }
    return params;
  }
}


