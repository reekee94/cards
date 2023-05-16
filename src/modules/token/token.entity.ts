import { Exclude } from 'class-transformer';
import { DefaultFields } from 'src/common/utils/default.fields';
import { Column, Entity, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Token extends DefaultFields {
  @Column()
  refreshToken: string;

  @OneToOne(() => User, (user) => user.refreshToken, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @Exclude()
  user: User;
}
