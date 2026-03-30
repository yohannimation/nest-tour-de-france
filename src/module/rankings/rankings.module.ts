import { Module } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { RankingsController } from './rankings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from './entities/ranking.entity';
import { Rider } from '../riders/entities/rider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking, Rider])],
  controllers: [RankingsController],
  providers: [RankingsService],
})
export class RankingsModule {}
