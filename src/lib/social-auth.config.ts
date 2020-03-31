import { InjectionToken } from '@angular/core';
import { GoogleConfig } from './providers/google.provider';
import { MicrosoftConfig } from './providers/microsoft.provider';
import { FacebookConfig } from './providers/facebook.provider';
import { LinkedinConfig } from './providers/linkedin.provider';

export interface SocialAuthConfig {
  google?: GoogleConfig;
  microsoft?: MicrosoftConfig;
  facebook?: FacebookConfig;
  linkedin?: LinkedinConfig;
}

export const SocialAuthConfigService = new InjectionToken<SocialAuthConfig>('SocialAuthConfig');
