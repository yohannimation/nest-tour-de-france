import { Ranking } from "src/module/rankings/entities/ranking.entity";
import { Team } from "src/module/team/entities/team.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('riders')
export class Rider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  nationality: string;

  @ManyToOne(() => Team, (team) => team.riders, { onDelete: 'CASCADE' })
  team: Team;

  @OneToOne(() => Ranking, (ranking) => ranking.rider)
  ranking: Ranking;
}
