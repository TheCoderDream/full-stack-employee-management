import {InjectionToken, Provider} from '@angular/core';
import { environment } from '../../environments/environment';

export const API_URL = new InjectionToken('API_URL');

export const apiUrlProvider: Provider = {
  provide: API_URL,
  useValue: environment.apiURL
};
