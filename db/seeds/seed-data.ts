import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { User } from '../../src/users/user.entity';
import { faker } from '@faker-js/faker';
import { Artist } from '../../src/artists/artist.entity';
import { Playlist } from '../../src/playlists/playlist.entity';

const PASSWORD = 'admin';

export const seedData = async (manager: EntityManager) => {
  await seedUser();
  await seedArtist();
  await seedPlaylists();
  async function seedUser() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(PASSWORD, salt);

    const firstName = faker.person.firstName();
    const user = manager.create(User, {
      firstName,
      lastName: faker.person.lastName(),
      password: encryptedPassword,
      email: faker.internet.email({ firstName }),
      apiKey: uuid(),
    });

    await manager.getRepository(User).save(user);
  }

  async function seedArtist() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(PASSWORD, salt);

    const firstName = faker.person.firstName();
    const user = manager.create(User, {
      firstName,
      lastName: faker.person.lastName(),
      password: encryptedPassword,
      email: faker.internet.email({ firstName }),
      apiKey: uuid(),
    });

    const artist = manager.create(Artist, {
      user,
    });

    await manager.getRepository(User).save(user);
    await manager.getRepository(Artist).save(artist);
  }

  async function seedPlaylists() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(PASSWORD, salt);

    const firstName = faker.person.firstName();
    const user = manager.create(User, {
      firstName,
      lastName: faker.person.lastName(),
      password: encryptedPassword,
      email: faker.internet.email({ firstName }),
      apiKey: uuid(),
    });

    const playlist = manager.create(Playlist, {
      user,
      name: faker.commerce.productName(),
    });

    await manager.getRepository(User).save(user);
    await manager.getRepository(Playlist).save(playlist);
  }
};
