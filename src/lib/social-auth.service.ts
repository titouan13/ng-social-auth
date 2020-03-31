import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GoogleProvider } from './providers/google.provider';
import { MicrosoftProvider } from './providers/microsoft.provider';
import { FacebookProvider } from './providers/facebook.provider';
import { LinkedinProvider } from './providers/linkedin.provider';
import { SocialAuthConfig, SocialAuthConfigService } from './social-auth.config';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {
  socialAuthConfig: SocialAuthConfig;

  constructor(
    private googleProvider: GoogleProvider,
    private microsoftProvider: MicrosoftProvider,
    private facebookProvider: FacebookProvider,
    private linkedinProvider: LinkedinProvider,
    @Inject(SocialAuthConfigService) private socialAuthConfigC: SocialAuthConfig
  ) {
    this.socialAuthConfig = socialAuthConfigC;
  }

  public getParsedResponse(): Observable<any> {
    const uriParams = this.getUriParams();
    const csrf = localStorage.getItem('csrf_social_auth');
    localStorage.removeItem('csrf_social_auth');

    // No auth found in URI
    if (uriParams === null) {
      return new Observable(observable => {
        observable.error(uriParams);
      });
    }

    // Error sent by id provider
    if (uriParams.hasOwnProperty('error') && uriParams['error'] !== '') {
      return new Observable(observable => {
        observable.error(uriParams);
      });
    }

    // Check if csrf token is valid
    if (!uriParams.hasOwnProperty('state') || csrf === null || decodeURIComponent(uriParams['state']) !== csrf) {
      return new Observable(observable => {
        observable.error(uriParams);
      });
    }

    return new Observable(observable => {
      observable.next(uriParams);
      observable.complete();
    });
  }

  public getGoogleUserConsent(): void {
    const oauth2Endpoint = this.googleProvider.getOauth2Endpoint();
    const params = this.googleProvider.getUserConsentParams(this.socialAuthConfig.google);
    this.getUserConsent(oauth2Endpoint, params);
  }

  public getMicrosoftUserConsent(): void {
    if (!this.socialAuthConfig.microsoft.nonce) {
      this.socialAuthConfig.microsoft.nonce = this.generateCSRFToken(20);
    }
    const oauth2Endpoint = this.microsoftProvider.getOauth2Endpoint(this.socialAuthConfig.microsoft);
    const params = this.microsoftProvider.getUserConsentParams(this.socialAuthConfig.microsoft);
    this.getUserConsent(oauth2Endpoint, params);
  }

  public getLinkedinUserConsent(): void {
    const oauth2Endpoint = this.linkedinProvider.getOauth2Endpoint();
    const params = this.linkedinProvider.getUserConsentParams(this.socialAuthConfig.linkedin);
    this.getUserConsent(oauth2Endpoint, params);
  }

  public getFacebookUserConsent(): void {
    const oauth2Endpoint = this.facebookProvider.getOauth2Endpoint();
    const params = this.facebookProvider.getUserConsentParams(this.socialAuthConfig.facebook);
    this.getUserConsent(oauth2Endpoint, params);
  }

  private getUriParams(): object {
    let uri = '';
    if (window.location.search !== '') {
      uri = window.location.search.substr(1);
    } else if (window.location.hash !== '') {
      uri = window.location.hash.substr(1);
    } else {
      return null;
    }

    const uriParams = {};
    uri.split('&').forEach(arg => {
      const item = arg.split('=');
      uriParams[item[0]] = decodeURIComponent(item[1]);
    });

    return uriParams;
  }

  private generateCSRFToken(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789)(*%$#@!,.;';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    localStorage.setItem('csrf_social_auth', result);
    return result;
  }

  private getUserConsent(oauth2Endpoint: string, params: object): void {
    // Add a CSRF token
    // params['state'] = '{csrf:' + this.generateCSRFToken(40) + '}';
    params['state'] = this.generateCSRFToken(40);

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    const form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Add form parameters as hidden input values.
    for (const p of Object.keys(params)) {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      // Redirect_uri must not be encoded
      if (p === 'redirect_uri') {
        input.setAttribute('value', params[p]);
      } else {
        input.setAttribute('value', encodeURIComponent(params[p]));
      }
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }
}
