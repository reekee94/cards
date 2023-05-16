import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CardModule } from '../card/card.module';
import { ApplicationSeedService } from './application-seed.service';

@Module({
  imports: [UserModule, CardModule],
  providers: [ApplicationSeedService],
})
export class ApplicationSeedModule implements OnApplicationBootstrap {
  constructor(private readonly seedService: ApplicationSeedService) {}

  async onApplicationBootstrap() {
    await this.seedService.plant();
  }
}
