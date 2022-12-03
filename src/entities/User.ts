import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';

import { FavoriteTheme } from './FavoriteTheme';
import { Address } from './Address';

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

  @OneToMany(() => FavoriteTheme, (favoriteTheme) => favoriteTheme.user)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'user_id',
  })
  favoriteThemes: FavoriteTheme[];

  @OneToOne(() => Address)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'user_id',
  })
  user: User;
}
