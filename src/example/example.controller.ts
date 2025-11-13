import { ExampleServices } from './example.services';
import { Controller, Get } from '@nestjs/common';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleServices) {}

  @Get('init')
  init() {
    return this.exampleService.getHello();
  }
}
