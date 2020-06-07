import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseErrorInterceptor } from './response-error.interceptor';

export const InterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseErrorInterceptor, multi: true }
]