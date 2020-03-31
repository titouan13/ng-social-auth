# NgSocialAuth
This module is in BETA version. Any help is appreciated.
This lib willingly avoid using official libs provided by companies. This is what keeps this lib lightweight and guarantees that your social auth won't be blocked by extensions such as ghostery, adblock, ublock etc.

## Installation
Create a configuration file SocialAuthConfig containing configuration for the appropriate provider(s)  
For example:  
```javascript
export const SocialAuthConfig = {
  google: {
    clientId: 'XXXX.apps.googleusercontent.com',
    redirectUri: 'YYY',
    scope: 'email',
    responseType: 'token'
  }
}
```


In you app.module.ts, import the NgSocialAuth lib with SocialAuthConfig under imports: 
```javascript
import { SocialAuthModule } from 'ng-social-auth/src/lib/social-auth.module';
import { SocialAuthConfig } from './PATH_TO_CONFIG/social-auth.config';
(...)
imports: [
...
SocialAuthModule.forRoot(SocialAuthConfig),
]
```


## How to use
Get user consent from the appropriate provider:  
getGoogleUserConsent()  
getMicrosoftUserConsent()  
getLinkedinUserConsent()  
getFacebookUserConsent()  

On your redirect URI, in the constructor  
```javascript
  constructor(
    private socialAuthService: SocialAuthService
  ) {
  socialAuthService.getParsedResponse()
  .subscribe(data => {
            // DO STUFF
          },
          error => {
            // Manage errors
              if (error !== null) {
                console.log(error);
              }
          });
  }
```
  
getParsedResponse will parse the URL returned and sent back all information.  


## Google
Create an account on https://console.cloud.google.com/  
Set up redirect_uri  
Get client_id and scope you need from https://developers.google.com/identity/protocols/googlescopes  

Configuration:
```javascript
  // Mandatory
  clientId: string;
  scope: string;
  responseType: string;
  redirectUri: string;
  // Optional
  includeGrantedScopes: boolean;
  loginHint: string;
  prompt: string;
```

## Microsoft
Create an account following this tutorial https://docs.microsoft.com/en-us/azure/active-directory-b2c/identity-provider-microsoft-account  

Get the scope (space-separated) you need from https://docs.microsoft.com/en-us/graph/permissions-reference  

Configuration:
```javascript
  // Mandatory
  clientId: string;
  scope: string;
  responseType: string;
  // Optional for user but set up by lib
  nonce: string;
  // Optional
  responseMode: string;
  redirectUri: string;
  loginHint: string;
  domainHint: string;
  prompt: string;
  tenant: string;
```

## Linkedin
Create an app here https://www.linkedin.com/developers/developer/apps  
Set up redirect_uri  
Get client_id  

Configuration:
```javascript
  // Mandatory
  clientId: string;
  redirectUri: string;
  scope: string;
```

## Facebook
Create an account following this tutorial https://docs.microsoft.com/en-us/azure/active-directory-b2c/identity-provider-microsoft-account  
Set up redirect_uri  
Get client_id and scope you need from https://developers.facebook.com/docs/facebook-login/permissions/  

Configuration:
```javascript
  // Mandatory
  clientId: string;
  redirectUri: string;
  // Optional
  responseType: string;
  scope: string;  
```
