import { Module } from '@nestjs/common';
import { ExampleServices } from './example.services';
import { ExampleController } from './example.controller';
import { DiscoveryModule } from '@nestjs/core';
import { ExampleCustomServices } from './example.custom.services';

@Module({
  controllers: [ExampleController],
  providers: [ExampleServices, ExampleCustomServices],
  imports: [DiscoveryModule],
})
export class ExampleModule {}
