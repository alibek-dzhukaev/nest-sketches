import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from '../artists/artist.entity';

// const mockSongsService = {
//   findAll() {
//     return [{ id: 1, title: 'Lasting lover' }];
//   },
// };

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [
    SongsService,
    // {
    //   useClass: SongsService,
    //   provide: SongsService
    // },
    // {
    //   provide: SongsService,
    //   useValue: mockSongsService
    // }
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
