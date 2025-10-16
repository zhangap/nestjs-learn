import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ExceptionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((value) => {
        //所有的返回操作都会经过这里，可以在这里做特殊处理。
        console.log('@zap!!!!!!!!!!', value);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return value === null ? '' : value;
      }),
    );
  }
}
