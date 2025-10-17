import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './AuthGurad';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [CatsModule, ConfigModule.register({ folder: './config' })],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
