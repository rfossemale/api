import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Ticket from './Ticket';

@Table
class File extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Ticket)
  @Column
  ticket_id: number;

  @Column
  file_name: string;

  @Column
  file_path: string;

  @BelongsTo(() => Ticket)
  ticket: Ticket;
}

export default File;
