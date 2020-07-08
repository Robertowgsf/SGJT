import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseErrorInterceptor } from './response-error.interceptor';
import { AuthenticationInterceptor } from './authentication.interceptor';

export const InterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
]