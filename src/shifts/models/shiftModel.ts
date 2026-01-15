import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Shift extends Model {
    @Column({
        type: DataType.DATE
    })
    startTime: Date;

    @Column({
        type: DataType.DATE,
    })
    endTime: Date;

    @Column({
        type: DataType.STRING
    })
    location: string;
}
