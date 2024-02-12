import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import Ticket from './Ticket';

@Table
class Company extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @HasMany(() => Ticket)
  tickets!: Ticket[];
}

export default Company;
