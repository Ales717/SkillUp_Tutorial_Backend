import { Module } from '@nestjs/common'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ORMConfig } from 'config/orm.config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ORMConfig(ConfigService),
    }),
  ],
})
export class DatabaseModule {}
