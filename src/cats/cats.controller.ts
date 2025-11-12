import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatDto } from './cat.dto';
import { Cat } from './cat.interface';

import * as ZodValidationPipe from '../pipe/ZodValidationPipe';
import { ValidationPipe } from '../pipe/ValidationPipe';
import { ClassValidateCatDto } from './classValidate.cat.dto';
import { User } from '../decorator/user.decorator';
import * as svgCaptcha from 'svg-captcha';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    @Inject('fox') private readonly fox: number,
  ) {}

  @Get('list')
  async findAll(@User() user: any): Promise<Cat[]> {
    console.log(user);
    console.log('findAll被执行' + Date.now());
    console.log(this.fox);
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

  //生成验证码
  @Get('getCaptcha')
  createCaptcha(@Req() req: any, @Res() res: any) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#ccc',
    });
    req.session.captcha = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
  //注册
  @Post('register')
  register(@Req() req: any, @Body() body: any) {
    console.log(req.session.captcha);
    if (req?.session?.captcha.toLowerCase() === body?.captcha?.toLowerCase()) {
      return {
        message: '注册成功',
      };
    } else {
      return {
        message: '注册失败',
      };
    }
  }
}
