import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

type ConfigType = TypeOrmModuleOptions & PostgresConnectionOptions

type ConnectionOptions = ConfigType

export const ORMConfig = async (configService: ConfigService): Promise<ConnectionOptions> => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PWD'),
    database: configService.get('DATABASE_NAME'),
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    /* ssl: true,
      extra: {
          ssl: {
              rejectUnathorized: false
          }
      } če imam to, povezava na bazo ne uspe */
})
