import { faker } from "@faker-js/faker";
import { INestApplicationContext } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Ranking } from "src/module/rankings/entities/ranking.entity";
import { Rider } from "src/module/riders/entities/rider.entity";
import { Repository } from "typeorm";

export async function seedRankings(
  app: INestApplicationContext,
  riders: Rider[],
) {
  const rankingRepository = app.get<Repository<Ranking>>(
    getRepositoryToken(Ranking),
  );

  const rankings: Ranking[] = [];

  // Random shuffle of riders
  const shuffled = faker.helpers.shuffle(riders);

  // Generate a ranking by rider in shuffle order
  shuffled.forEach((rider, index) => {
    const ranking = rankingRepository.create({
      position: index + 1,
      rider: rider,
    });

    rankings.push(ranking);
  });

  await rankingRepository.save(rankings);
  return rankings;
}
