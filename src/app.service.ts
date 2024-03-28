import { Inject, Injectable, Scope } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class AppService {
  constructor(
    private defConfigService: DevConfigService,
    @Inject("CONFIG")
    private readonly config: { port: string }
  ) {
  }

  getHello(): string {
    return `Heelo there ${this.defConfigService.getDBHost()} port should be ${this.config.port}`;
  }
}
