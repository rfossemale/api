import {Injectable} from "@nestjs/common";
import { Sequelize } from 'sequelize-typescript';
import { UserService } from "../user/user.service";
import { Employee } from "../../models/Employee";

@Injectable()
export class EmployeeService {
  constructor(
    private sequelize: Sequelize,
    private userService: UserService,
    private employeeModel: typeof Employee,
  ) {

  }
  async createMany(data) {
    try {
      await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };
        await this.userService.createUser(data, transactionHost);
        await this.employeeModel.create(
          { rol: 'Abraham', area: 'Lincoln', team: '' },
          transactionHost,
        );

      });
    } catch (err) {
      // Transaction has been rolled back
      // err is whatever rejected the promise chain returned to the transaction callback
    }
  }
}

