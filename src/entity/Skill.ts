import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Wilder } from "./Wilder";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  note: number;

  @ManyToMany((type) => Wilder, (wilder) => wilder.skill)
  wilders: Wilder[];
}
