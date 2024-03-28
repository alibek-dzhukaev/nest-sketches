import { DataSource, DataSourceOptions } from 'typeorm';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../src/users/user.entity';
import { Playlist } from '../src/playlists/playlist.entity';
import { Artist } from '../src/artists/artist.entity';
import { Song } from '../src/songs/song.entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: configService.get<string>('postgres_host'),
    port: configService.get<number>('postgres_port'),
    username: configService.get<string>('postgres_user'),
    password: configService.get<string>('postgres_password'),
    database: configService.get<string>('postgres_db'),
    entities: [User, Playlist, Artist, Song],
    synchronize: false,
    migrations: ['dist/db/migrations/*.js'],
  }),
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
