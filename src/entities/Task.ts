import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number; // TypeORM will assign this value

  @Column()
  title!: string; // TypeORM will assign this value

  @Column({ nullable: true })
  description!: string | null; // Nullable in the database, so can be null

  @Column({ type: "enum", enum: ["inbox", "next_action", "waiting_for", "someday_maybe"] })
  status!: string; // TypeORM will assign this value

  @Column({ nullable: true, type: "timestamp" })
  dueDate!: Date | null; // Nullable in the database, so can be null

  @Column({ nullable: true })
  contextTags!: string | null; // Nullable in the database, so can be null

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE" })
  user!: User; // TypeORM will manage this relationship
}