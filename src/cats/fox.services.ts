import { Injectable } from '@nestjs/common';

@Injectable()
export class FoxServices {
  getHello(): string {
    return `Hello I'm Fox`;
  }
}
