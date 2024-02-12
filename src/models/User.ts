import { Table, Column, Model, Unique, DataType } from 'sequelize-typescript';

@Table
class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.ENUM('normal', 'operator', 'administrator'))
  role: 'normal' | 'operator' | 'administrator';
}

export default User;
