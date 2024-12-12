import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./Task";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // TypeORM will assign this value

  @Column()
  name!: string; // TypeORM will assign this value

  @Column({ unique: true })
  email!: string; // TypeORM will assign this value

  @Column()
  passwordHash!: string; // TypeORM will assign this value

  @Column({ default: "user" })
  role!: string; // Default handled by TypeORM

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[]; // TypeORM will populate this relation
}