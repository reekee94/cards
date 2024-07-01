// import { Module, OnApplicationBootstrap } from '@nestjs/common';
// import { UserModule } from '../user/user.module';
// import { PortfolioModule } from '../card/card.module';
// import { ApplicationSeedService } from './application-seed.service';

// @Module({
//   imports: [UserModule, PortfolioModule],
//   providers: [ApplicationSeedService],
// })
// export class ApplicationSeedModule implements OnApplicationBootstrap {
//   constructor(private readonly seedService: ApplicationSeedService) {}

//   async onApplicationBootstrap() {
//     await this.seedService.plant();
//   }
// }
