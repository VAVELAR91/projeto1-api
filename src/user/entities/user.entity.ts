import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamptz' })
  protected createdAt: Date;

  @BeforeInsert()
  protected generatedId() {
    if (this.id) return;
    this.id = uuid();
  }

  protected toJSON() {
    const { password: _, ...user } = this;
    return user;
  }
}
