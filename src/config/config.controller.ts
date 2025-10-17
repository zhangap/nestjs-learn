import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}
  @Get()
  getConfig(): string {
    return this.configService.get('HELLO_MESSAGE');
  }
}
