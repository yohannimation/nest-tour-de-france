import { Team } from "src/module/team/entities/team.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
