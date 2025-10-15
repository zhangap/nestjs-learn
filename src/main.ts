import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  const logger = new Logger();
  // logger.warn('这个是警告日志');
  // logger.error('这个是错误日志');
  // logger.log('这个是常规日志');
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server started: http://localhost:${3000}`);
}
bootstrap();
