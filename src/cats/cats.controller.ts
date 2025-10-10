import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatDto } from './cat.dto';
import { Cat } from './cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  @Post()
  create(@Body() createCatDto: CatDto) {
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  findByOne(@Param('id') id: string): CatDto {
    console.log(`find ${id}`);
    return {
      name: 'myCat',
      age: 20,
      breed: 'hello world',
    };
  }
}
