import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse

} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
//import { of } from 'rxjs/observable/of';
/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private handleData(event: HttpResponse<any> | HttpErrorResponse, ): Observable<any> {
        // 业务处理：一些通用操作
        switch (event.status) {
            case 200:
                if (event instanceof HttpResponse) {
                    const body: any = event.body;

                    return of(event)
                }
                break;
            case 401: // 未登录状态码
                //this.goTo('/login');
                break;
            case 404:
            case 500:
                break;
            default:
                return of(event);
        }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log(req);
        let req = request.clone({
            setHeaders: {
                token: sessionStorage.getItem('token') || ''
            }
        });//这里可以在请求中加参数
        return next.handle(req).pipe(
            mergeMap((event: any) => {
                // 正常返回，处理具体返回参数
                if (event instanceof HttpResponse && event.status === 200) {
        
                    return this.handleData(event);//具体处理请求返回数据
                }
                return of(event);
            }),
            catchError((err: HttpErrorResponse) => this.handleData(err))
        )
    }

}