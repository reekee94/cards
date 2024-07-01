// import { Injectable, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { IAppConfig } from 'src/common/configs/app.config';
// import { ConfigNames } from 'src/common/types/enums/configNames.enum';
// import { runWithQueryRunner } from 'src/common/utils/runWithQueryRunner';
// import { DataSource } from 'typeorm';
// import { CardsSeed } from '../card/seeds/card-type.seed';

// @Injectable()
// export class ApplicationSeedService {
//   private readonly _logger = new Logger(ApplicationSeedService.name);
//   constructor(
//     private readonly _ds: DataSource,
//     private readonly _configService: ConfigService,

//     private readonly _cardSeed: CardsSeed,
//   ) {}

//   async plant() {
//     const config = this._configService.get<IAppConfig>(ConfigNames.APP);

//     // TODO CONFIG
//     // if (config?.isDev) {
//     await this.plantDev();
//     // }
//   }

//   private async plantDev() {
//     try {
//       await runWithQueryRunner(this._ds, async (qr) => {
//         await this._cardSeed.plant(qr);
//         // await this._gameSeed.plant(qr);
//       });
//     } catch (error) {
//       this._logger.error(error);
//     }
//   }
// }
