import { registerAs } from '@nestjs/config';
import { ConfigNames } from 'src/common/types/enums/configNames.enum';

export interface IAppConfig {
  port: number;
  bcryptSalt: number;
}

export default registerAs(ConfigNames.APP, () => {
  const port = process.env.PORT ? +process.env.PORT : 5003;

  const config: IAppConfig = {
    port: port,
    bcryptSalt: 4,
  };
  return config;
});
