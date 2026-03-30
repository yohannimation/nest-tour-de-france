import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";

import { seedTeams } from "./teams.seed";
import { seedStages } from "./stages.seed";
import { seedRiders } from "./riders.seed";
import { seedRankings } from "./rankings.seed";

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const teams = await seedTeams(app);
  console.log(teams.length + ' team added in database.');

  const stages = await seedStages(app);
  console.log(stages.length + ' stage added in database.');

  const riders = await seedRiders(app, teams);
  console.log(riders.length + ' rider added in database.');

  const rankings = await seedRankings(app, riders);
  console.log(rankings.length + ' ranking added in database.');

  await app.close();
}

seed();
