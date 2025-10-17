import { Cat } from './cat.interface';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { sleep } from '../util/common';
import { ConfigService } from '../config/config.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class CatsService implements OnModuleInit {
  private configService: ConfigService;

  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    // 要从全局上下文中检索提供者（例如，如果该提供者已注入到其他模块中），请将 { strict: false } 选项作为第二个参数传递给 get()。
    this.configService = await this.moduleRef.get(ConfigService, {
      strict: false,
    });
  }

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

  getConfig(): string {
    return this.configService.get('HELLO_MESSAGE');
  }
}
