import {
  Controller,
  Post,
  Body,
  Query,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { UserService } from '../services/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async status() {
    return 'Up and running';
  }
  @Post('/login')
  async login(@Body() credentials: { email: string; password: string }) {
    try {
      const { success, data, error } =
        await this.userService.validateUser(credentials);
      if (success) {
        return { status: 'success', data };
      }
      return { status: 'error', error: error }; // format error
    } catch (error) {
      // CREATE ERROR HANDLING  ASAP
      return { status: 'error', error: error };
    }
  }
  @Get()
  async getUser(
    @Query('id', ParseIntPipe) id: number,
    @Query('email') email: string,
  ) {
    const user = await this.userService.getUser({ id, email });
    return { success: true, user };
  }

  @Post()
  async createUser(@Body() createUserDto: any) {
    try {
      const user = await this.userService.createUser(createUserDto, null);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
