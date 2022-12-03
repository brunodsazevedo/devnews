import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

import { User } from './User';

@Entity({
  name: 'addresses',
})
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement?: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 8 })
  zip_code: string;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;
}
