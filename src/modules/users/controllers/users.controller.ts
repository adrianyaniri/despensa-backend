import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto, UserUpdatedDto } from '../dto/user.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PublicAccess } from '../../auth/decorators/publicAccess.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard'

@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicAccess()
  @Post('register')
  public async registerUser(@Body() body: UserDto) {
    return await this.usersService.createUsers(body);
  }

  @PublicAccess()
  @Post('add-to-project')
  public async addUserToProject(@Body() body: any) {
    return await this.usersService.relationToProject(body);
  }

  @Roles('BASIC')
  @Get('all')
  public async getUsers() {
    return await this.usersService.findUsers();
  }

  @PublicAccess()
  @Get(':id')
  public async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findUserById(id);
  }

  @Roles('ADMIN')
  @Put('update/:id')
  public async updateUserById(
    @Param('id') id: string,
    @Body() body: UserUpdatedDto,
  ) {
    return await this.usersService.updateUserById(id, body);
  }

  @Roles('ADMIN')
  @Delete('delete/:id')
  public async deleteUserById(@Param('id') id: string) {
    return await this.usersService.deleteUserById(id);
  }
}
