import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(private sequelize: Sequelize) {}

  async getHello(): Promise<any> {
    const data = await this.sequelize.query('select 1+1 as Result');
    return data[0][0];
  }
}
