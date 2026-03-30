import { faker } from "@faker-js/faker";
import { INestApplicationContext } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Rider } from "src/module/riders/entities/rider.entity";
import { Team } from "src/module/team/entities/team.entity";
import { Repository } from "typeorm";

export async function seedRiders(app: INestApplicationContext, teams: Team[]) {
  const riderRepository = app.get<Repository<Rider>>(getRepositoryToken(Rider));

  const riders: Rider[] = [];

  for (let i = 0; i < 20; i++) {
    const rider = riderRepository.create({
      name: faker.person.fullName(),
      nationality: faker.location.country(),
      team: faker.helpers.arrayElement(teams),
    });

    riders.push(rider);
  }

  await riderRepository.save(riders);
  return riders;
}