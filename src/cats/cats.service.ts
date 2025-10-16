import { Cat } from './cat.interface';
import { Injectable } from '@nestjs/common';
import { sleep } from '../util/common';

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
  async findAll(): Promise<Cat[]> {
    // 睡眠三秒
    await sleep(3000);
    return this.cats;
  }
}
