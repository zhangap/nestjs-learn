import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

//日志拦截器
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log(`${context.getHandler().name}方法被执行Before`);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`LoggingInterceptor-执行耗时：${Date.now() - now}ms`),
        ),
      );
  }
}
