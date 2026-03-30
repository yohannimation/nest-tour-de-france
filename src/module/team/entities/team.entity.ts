import { Rider } from "src/module/riders/entities/rider.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', length: 128 })
  country: string;

  @OneToMany(() => Rider, (rider) => rider.team)
  riders: Rider[];
}
