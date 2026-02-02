import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('stages')
export class Stage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startCity: string;

  @Column()
  endCity: string;

  @Column()
  distance: number;

  @Column()
  altitude: number;
}
