import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import Company from './Company';
import User from './User';

@Table
class Ticket extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Company)
  @Column
  company_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column
  subject: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.ENUM('high', 'medium', 'low'))
  priority: 'high' | 'medium' | 'low';

  @Column
  creation_date: Date;

  @Column(DataType.ENUM('pending', 'in progress', 'blocked', 'completed'))
  status: 'pending' | 'in progress' | 'blocked' | 'completed';

  @Column(DataType.INTEGER)
  operator_rating!: number;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsTo(() => User)
  user: User;
}

export default Ticket;
