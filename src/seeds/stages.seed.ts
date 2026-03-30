import { faker } from "@faker-js/faker";
import { INestApplicationContext } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Stage } from "src/module/stages/entities/stage.entity";
import { Repository } from "typeorm";

export async function seedStages(app: INestApplicationContext) {
  const stageRepository = app.get<Repository<Stage>>(getRepositoryToken(Stage));

  const stages: Stage[] = [];

  for (let i = 0; i < 10; i++) {
    const stage = stageRepository.create({
      startCity: faker.location.city(),
      endCity: faker.location.city(),
      distance: faker.number.int({ min: 80, max: 500 }),
      altitude: faker.number.int({ min: 80, max: 200 }),
    });
    stages.push(stage);
  }

  await stageRepository.save(stages);
  return stages;
}
