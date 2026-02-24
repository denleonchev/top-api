import { ConfigService } from '@nestjs/config';

export const getMongoConfigs = (configService: ConfigService) => ({
  uri: getMongoUri(configService),
});

const getMongoUri = (configService: ConfigService) =>
  'mongodb://' +
  configService.get('MONGO_LOGIN') +
  ':' +
  configService.get('MONGO_PASSWORD') +
  '@' +
  configService.get('MONGO_HOST') +
  ':' +
  configService.get('MONGO_PORT') +
  '/' +
  configService.get('MONGO_AUTHDATABASE');
