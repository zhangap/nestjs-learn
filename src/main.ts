import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filters';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { ExceptionInterceptor } from './interceptor/exclude.null.interceptor';
import { TimeoutInterceptor } from './interceptor/timeout.interceptor';
import session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
  });
  app.use(
    session({
      secret: 'fox',
      name: 'nestjs-fox',
      rolling: true,
      cookie: {
        maxAge: 1000 * 60 * 60,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    ...[
      new LoggingInterceptor(),
      new ExceptionInterceptor(),
      new TimeoutInterceptor(),
    ],
  );
  // 允许跨域
  // app.enableCors();
  const logger = new Logger();
  // logger.warn('这个是警告日志');
  // logger.error('这个是错误日志');
  // logger.log('这个是常规日志');
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server started: http://localhost:${3000}`);
}
bootstrap();
