import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse

} from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
//import { of } from 'rxjs/observable/of';
/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private messge: NzMessageService) {

    }
    private handleData(event: HttpResponse<any>, ): Observable<any> {
        // 业务处理：一些通用操作
        let body = event.body;

        switch (body.code) {
            case 'SUCCESS':
            case 'success':
                return of(event);
                break;
            default:
                this.messge.error(body.message);
                return throwError(event.body)
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
                //console.log(event);
                if (event instanceof HttpResponse && event.status === 200) {
                    return this.handleData(event);//具体处理请求返回数据
                }
                return of(event);
            }),
            // catchError((err: HttpErrorResponse) => {
            //     console.error(err);
            // })
        )
    }

}