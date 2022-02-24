import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {API_URL} from '../tokens/api-url';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  constructor(@Inject(API_URL) private apiUrl: string) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      url: this.apiUrl + req.url
    });

    return next.handle(authReq).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            console.log('Server response');
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            // tslint:disable-next-line:triple-equals
            if (err.status == 401) {
              console.log('Unauthorized');
            }
          }
        }
      )
    );
  }
}
