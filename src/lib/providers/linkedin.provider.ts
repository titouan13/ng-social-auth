export interface LinkedinConfig {
  // Mandatory
  clientId: string;
  redirectUri: string;
  scope: string;
}

export class LinkedinProvider {

  constructor() {
  }

  getOauth2Endpoint() {
    const oauth2Endpoint = 'https://www.linkedin.com/oauth/v2/authorization';
    return oauth2Endpoint;
  }

  // https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/context
  getUserConsentParams(config: LinkedinConfig, scope: string): object {
    const params = {
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope,
      response_type: 'code'
    };

    // Allow scope to be overridden
    if(typeof scope !== 'undefined' && scope !== null){
      params['scope'] = scope;
    }

    return params;
  }
}


