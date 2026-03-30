import { faker } from '@faker-js/faker';
import { INestApplicationContext } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Team } from 'src/module/team/entities/team.entity';
import { Repository } from 'typeorm';

export async function seedTeams(app: INestApplicationContext) {
  const teamRepository = app.get<Repository<Team>>(getRepositoryToken(Team));

  const teams: Team[] = [];

  for (let i = 0; i < 10; i++) {
    const team = teamRepository.create({
      name: faker.company.name(),
      country: faker.location.country(),
    });
    teams.push(team);
  }

  await teamRepository.save(teams);
  return teams;
}
