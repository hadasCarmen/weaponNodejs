import { Column, DataType, Default, Model, Table } from 'sequelize-typescript';

@Table
export class Item extends Model {
  @Column({
    type: DataType.STRING,
  })
  name: string;
  @Column({
    type: DataType.STRING,
  })
  type: string;

  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;

  @Column({
    type: DataType.INTEGER,
  })
  pricePerUnit: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  hasImage: boolean;
}
