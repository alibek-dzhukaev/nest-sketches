import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { seedData } from '../../db/seeds/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly connection: DataSource) {}

  async seed(): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const manager = queryRunner.manager;
      await seedData(manager);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log('error during database seeding: ', error);
    } finally {
      await queryRunner.release();
    }
  }
}
