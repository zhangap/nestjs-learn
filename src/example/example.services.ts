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
  add() {
    return {
      code: 0,
      data: {},
      message: 'example added success',
    };
  }

  /**
   * 如果num是5，产生1-5的数字，如果是6，产生1-6的数字
   * @param num
   */
  generateArr(num: number): Array<string> {
    const result: Array<string> = [];
    for (let i = 1; i <= num; i++) {
      result.push(`${i}`);
    }
    return result;
  }
}
