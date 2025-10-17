import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatDto } from './cat.dto';
import { Cat } from './cat.interface';

import * as ZodValidationPipe from '../pipe/ZodValidationPipe';
import { ValidationPipe } from '../pipe/ValidationPipe';
import { ClassValidateCatDto } from './classValidate.cat.dto';
import { User } from '../decorator/user.decorator';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('list')
  async findAll(@User() user: any): Promise<Cat[]> {
    console.log(user);
    console.log('findAll被执行' + Date.now());
    return await this.catsService.findAll();
  }

  //对象验证器
  // @Post('add')
  // @UsePipes(
  //   new ZodValidationPipe.ZodValidationPipe(ZodValidationPipe.createCatSchema),
  // )
  // create(@Body() createCatDto: ZodValidationPipe.CreatCatDto) {
  //   this.catsService.create(createCatDto);
  //   return {
  //     status: 200,
  //     message: 'Cats created',
  //   };
  // }

  //类验证器
  // @Post('add')
  // create(@Body(new ValidationPipe()) createCatDto: ClassValidateCatDto) {
  //   this.catsService.create(createCatDto);
  //   return {
  //     status: 200,
  //     message: 'Cats created',
  //   };
  // }
  @Post('add')
  create(@Body() createCatDto: ClassValidateCatDto) {
    this.catsService.create(createCatDto);
    return {
      status: 200,
      message: 'Cats created',
    };
  }

  @Get('find:id')
  findByOne(@Param('id', ParseIntPipe) id: number): CatDto {
    console.log(`find ${id}`);
    return {
      name: 'myCat',
      age: 20,
      breed: 'hello world',
    };
  }

  @Get('find/test')
  findSome() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  //模块之间相互引用的例子
  @Get('config')
  getConfig(): string {
    return this.catsService.getConfig();
  }
}
