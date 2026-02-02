import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamsRepository: Repository<Team>
  ) {}

  create(createTeamDto: CreateTeamDto) {
    return this.teamsRepository.save(createTeamDto);
  }

  findAll() {
    return this.teamsRepository.find();
  }

  findOne(id: number) {
    return this.teamsRepository.findOneBy({ id });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.teamsRepository.update(id, updateTeamDto);
  }

  remove(id: number) {
    return this.teamsRepository.delete(id);
  }
}
