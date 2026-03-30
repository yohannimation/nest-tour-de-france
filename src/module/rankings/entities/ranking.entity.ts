import { Rider } from "src/module/riders/entities/rider.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('rankings')
export class Ranking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  position: number;

  @OneToOne(() => Rider, (rider) => rider.ranking, { onDelete: 'CASCADE' })
  @JoinColumn()
  rider: Rider;
}
