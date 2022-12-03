import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, AfterInsert } from 'typeorm';

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'CURRENT_TIMESTAMP' })
  created_at: string;
}
