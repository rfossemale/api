import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Employee extends Model {
  @Column
  rol: string;

  @Column
  area: string;

  @Column
  team: string;
}
