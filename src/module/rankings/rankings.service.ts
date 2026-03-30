import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ranking } from './entities/ranking.entity';
import { Rider } from '../riders/entities/rider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RankingsService {
  constructor(
    @InjectRepository(Ranking) private rankingRepository: Repository<Ranking>,
    @InjectRepository(Rider) private riderRepository: Repository<Rider>,
  ) {}

  async create(createRankingDto: CreateRankingDto) {
    const alreadyPosition = await this.findByPosition(
      createRankingDto.position,
    );
    if (alreadyPosition) {
      throw new ConflictException(
        `Already exists a ranking at position #${createRankingDto.position}. Try to edit it instead.`,
      );
    }

    const rider = await this.riderRepository.findOne({
      where: { id: createRankingDto.riderId },
    });
    if (!rider) {
      throw new NotFoundException(
        `Rider with id #${createRankingDto.riderId} not found.`,
      );
    }

    const ranking = this.rankingRepository.create(createRankingDto);
    ranking.rider = rider;

    return this.rankingRepository.save(ranking);
  }

  findAll() {
    return this.rankingRepository.find({ relations: ['rider'] });
  }

  findOne(id: number) {
    return this.rankingRepository.findOne({
      where: { id },
      relations: ['rider'],
    });
  }

  findByPosition(position: number) {
    return this.rankingRepository.findOne({ where: { position } });
  }

  async update(id: number, updateRankingDto: UpdateRankingDto) {
    const ranking = await this.findOne(id);
    if (!ranking) {
      throw new NotFoundException(`Ranking with id #${id} not found.`);
    }

    // Rider update
    if (updateRankingDto.riderId) {
      const rider = await this.riderRepository.findOne({
        where: { id: updateRankingDto.riderId },
      });
      if (!rider) {
        throw new NotFoundException(
          `Rider with id #${updateRankingDto.riderId} not found.`,
        )
      }
    }

    //Ranking update
    if (updateRankingDto.position) {
      const alreadyPosition = await this.findByPosition(
        updateRankingDto.position,
      );
      if (alreadyPosition && alreadyPosition.id !== ranking.id) {
        throw new ConflictException(`
          Already exists a ranking at position #${updateRankingDto.position}.
          Try to edit it instead (id ${alreadyPosition.id}).
        `)
      }

      ranking.position = updateRankingDto.position;
    }

    return this.rankingRepository.update(id, ranking);
  }

  remove(id: number) {
    return this.rankingRepository.delete(id);
  }
}
