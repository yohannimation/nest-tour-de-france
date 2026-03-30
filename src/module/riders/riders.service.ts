import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rider } from './entities/rider.entity';
import { Repository } from 'typeorm';
import { Team } from '../team/entities/team.entity';

@Injectable()
export class RidersService {
  constructor(
    @InjectRepository(Rider) private riderRepository: Repository<Rider>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async create(createRiderDto: CreateRiderDto) {
    const team = await this.teamRepository.findOne({
      where: {
        id: createRiderDto.teamId,
      },
    });

    if (!team) {
      throw new NotFoundException(
        `Team with id #${createRiderDto.teamId} not found`,
      );
    }

    const rider = this.riderRepository.create({
      name: createRiderDto.name,
      nationality: createRiderDto.nationality,
      team: team,
    });

    return this.riderRepository.save(rider);
  }

  findAll() {
    return this.riderRepository.find({ relations: ['team'] });
  }

  findOne(id: number) {
    return this.riderRepository.findOne({
      where: { id },
      relations: ['team'],
    });
  }

  async update(id: number, updateRiderDto: UpdateRiderDto) {
    // Get rider
    const rider = await this.findOne(id);
    if (!rider) {
      throw new NotFoundException(`Rider with id #${id} not found`);
    }

    // If team need to be changed
    if (updateRiderDto.teamId) {
      const team = await this.teamRepository.findOne({
        where: {
          id: updateRiderDto.teamId,
        },
      });

      if (!team) {
        throw new NotFoundException(
          `Team with id #${updateRiderDto.teamId} not found`,
        );
      }

      rider.team = team;
    }

    if (updateRiderDto.name) {
      rider.name = updateRiderDto.name;
    }

    if (updateRiderDto.nationality) {
      rider.nationality = updateRiderDto.nationality;
    }

    return this.riderRepository.update(id, rider);
  }

  remove(id: number) {
    return this.riderRepository.delete(id);
  }
}
