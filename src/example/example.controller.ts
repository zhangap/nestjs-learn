import { ExampleServices } from './example.services';
import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleServices) {}

  @Get('init')
  init() {
    return this.exampleService.getHello();
  }

  @Post()
  addExample() {
    return this.exampleService.add();
  }

  @Get('range/:num')
  generateArr(@Param('num') num: number) {
    return {
      code: 0,
      msg: '请求成功',
      data: this.exampleService.generateArr(num),
    };
  }
}
