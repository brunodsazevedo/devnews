import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { User } from './User';

@Entity({
  name: 'favorite_themes',
})
export class FavoriteTheme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ unique: true })
  theme: string;

  @ManyToOne(() => User, (user) => user.favoriteThemes)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;
}
