import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { In, Repository } from 'typeorm';
import { Song } from '../songs/song.entity';
import { User } from '../users/user.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepo: Repository<Playlist>,
    @InjectRepository(Song)
    private readonly songsRepo: Repository<Song>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(playlistDto: CreatePlaylistDto): Promise<Playlist> {
    const { songs, user, ...rest } = playlistDto;
    const playlist = this.playlistRepo.create(rest);

    playlist.songs = await this.songsRepo.findBy({ id: In(songs) });
    playlist.user = await this.usersRepo.findOneBy({ id: user });

    return this.playlistRepo.save(playlist);
  }
}
