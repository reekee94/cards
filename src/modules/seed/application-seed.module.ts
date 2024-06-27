import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { CompanyModule } from '../company/company.module';
import { ApplicationSeedService } from './application-seed.service';
import { CardCommandHandlers } from '../company/commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CompanyModule, CqrsModule],
  providers: [ApplicationSeedService, ...CardCommandHandlers],
})
export class ApplicationSeedModule implements OnApplicationBootstrap {
  constructor(private readonly seedService: ApplicationSeedService) {}

  async onApplicationBootstrap() {
    await this.seedService.plant();
  }
}
