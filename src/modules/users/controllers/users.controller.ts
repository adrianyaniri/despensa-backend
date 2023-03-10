import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto, UserUpdatedDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  public async registerUser(@Body() body: UserDto) {
    return await this.usersService.createUsers(body);
  }

  @Get('all')
  public async getUsers() {
    return await this.usersService.findUsers();
  }

  @Get(':id')
  public async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findUserById(id);
  }

  @Put('update/:id')
  public async updateUserById(
    @Param('id') id: string,
    @Body() body: UserUpdatedDto,
  ) {
    return await this.usersService.updateUserById(id, body);
  }

  @Delete('delete/:id')
  public async deleteUserById(@Param('id') id: string) {
    return await this.usersService.deleteUserById(id);
  }
}
