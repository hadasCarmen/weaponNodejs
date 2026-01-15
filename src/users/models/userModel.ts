
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {


    @Column({
        type: DataType.STRING
    })
    username: string;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    password: string;

    @Column({
        type: DataType.STRING
    })
    role: string;

    @Column({
        type: DataType.STRING
    })
    email: string;

}
