import { NgModule } from '@angular/core';
import { SocialAuthService } from './social-auth.service';

import { GoogleProvider } from './providers/google.provider';
import { MicrosoftProvider } from './providers/microsoft.provider';
import { FacebookProvider } from './providers/facebook.provider';
import { LinkedinProvider } from './providers/linkedin.provider';
import { SocialAuthConfig, SocialAuthConfigService } from './social-auth.config';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    GoogleProvider,
    MicrosoftProvider,
    FacebookProvider,
    LinkedinProvider,
  ]
})

export class SocialAuthModule {
  static forRoot(
    socialAuthConfig: SocialAuthConfig
  ) {
    return {
      ngModule: SocialAuthModule,
      providers: [
        SocialAuthService,
        {provide: SocialAuthConfigService, useValue: socialAuthConfig}
      ]
    };
  }
}
