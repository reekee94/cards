import { ConfigService } from '@nestjs/config';
import { IAppConfig } from 'src/common/configs/app.config';
import { ConfigNames } from 'src/common/types/enums/configNames.enum';
import { generateHashFromString } from 'src/common/utils/hashUtil';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  private readonly _appConfig: IAppConfig;
  constructor(
    dataSource: DataSource,
    private readonly _configService: ConfigService,
  ) {
    dataSource.subscribers.push(this);
    const config = this._configService.get<IAppConfig>(ConfigNames.APP);
    if (!config) {
      throw new Error('App config does not exists');
    }
    this._appConfig = config;
    console.log('11111111111111111', config);
  }

  listenTo() {
    return User;
  }

  async beforeInsert({ entity }: InsertEvent<User>): Promise<void> {
    console.log('11111111111111111', this._appConfig.bcryptSalt);

    if (entity.password) {
      entity.password = await generateHashFromString(
        entity.password,
        this._appConfig.bcryptSalt,
      );
    }
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    if (event.entity) {
      (event.entity as User).updatedAt = new Date();
    }
  }
}
