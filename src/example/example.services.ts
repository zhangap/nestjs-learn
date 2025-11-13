import { Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { FeatureFlag } from './custom-metadata.decorator';

@Injectable()
export class ExampleServices {
  constructor(private readonly discoveryService: DiscoveryService) {
    console.log('Example Services Service constructor');
    // 检索应用中所有已注册的提供者
    const provides = this.discoveryService.getProviders();

    const [provider] = provides.filter((item) => {
      return (
        this.discoveryService.getMetadataByDecorator(FeatureFlag, item) ===
        'experimental'
      );
    });
    console.log(
      'Providers with the "experimental" feature flag metadata:',
      provider.name,
    );
    // 检索应用中所有已注册的控制器
    // const controllers = this.discoveryService.getControllers();
    // console.log(controllers);
  }
  getHello() {
    return 'hello ExampleServices';
  }
}
