import {
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';


@Table({
  tableName: 'tokens',
  timestamps: true,
})
export class Token extends Model<Token> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  refreshToken: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @HasOne(() => User)
  user: User;
}
