import { Cat } from './cat.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    {
      name: 'cat1',
      age: 3,
      breed: '田园猫',
    },
  ];

  create(cat: Cat) {
    this.cats.push(cat);
  }
  findAll(): Cat[] {
    return this.cats;
  }
}
