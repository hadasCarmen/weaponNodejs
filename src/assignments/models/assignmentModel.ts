import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/models/userModel';
import { Shift } from 'src/shifts/models/shiftModel';

@Table
export class Assignment extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Shift)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  shiftId: number;
}
