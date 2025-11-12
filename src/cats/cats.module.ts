import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { logger } from './logger.middleware';
import { FoxServices } from './fox.services';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    FoxServices,
    //工厂模式
    {
      provide: 'fox',
      inject: [FoxServices],
      async useFactory(foxService: FoxServices) {
        return await new Promise((resolve) =>
          setTimeout(() => {
            resolve(foxService.getHello());
          }, 1000),
        );
      },
    },
  ],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(CatsController);
  }
}
