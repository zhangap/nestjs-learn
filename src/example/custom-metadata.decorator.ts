import { DiscoveryService } from '@nestjs/core';

// 自定义装饰器
export const FeatureFlag = DiscoveryService.createDecorator();
