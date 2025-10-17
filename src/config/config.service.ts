import { EvnConfig } from './interfaces/envconfig.interface';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './constants';
import * as configOptionsInterface from './interfaces/config-options.interface';
import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: EvnConfig;

  constructor(
    @Inject(CONFIG_OPTIONS) options: configOptionsInterface.ConfigOptions,
  ) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;

    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
