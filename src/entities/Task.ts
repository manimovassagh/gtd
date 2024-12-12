import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "text", nullable: true }) // Explicitly set type as "text"
  description!: string | null;

  @Column({ type: "enum", enum: ["inbox", "next_action", "waiting_for", "someday_maybe"] })
  status!: string;

  @Column({ type: "timestamp", nullable: true })
  dueDate!: Date | null;

  @Column({ type: "text", nullable: true }) // Store tags as text, JSON if needed
  contextTags!: string | null;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE" })
  user!: User;
}