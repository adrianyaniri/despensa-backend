import { BaseService } from './service.base';
import {
  Body,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../modules/auth/guards/auth.guard';
import { PublicAccess } from '../modules/auth/decorators/publicAccess.decorator';
import { Roles } from '../modules/auth/decorators/roles.decorator';
import { AccessLevelGuard } from '../modules/auth/guards/access-level.guard';
import { RolesGuard } from '../modules/auth/guards/roles.guard';
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ControllerBase<T> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Post('register')
  async create(@Body() body: T) {
    try {
      const createEntity = this.baseService.create(body);
      return {
        statusCode: HttpStatus.CREATED,
        data: createEntity,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Roles('BASIC')
  @Get('all')
  async findAll() {
    try {
      const entities = await this.baseService.findAll();
      return {
        statusCode: HttpStatus.OK,
        data: entities,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @PublicAccess()
  @Get(':id')
  async findOneById(@Param('id') id: string) {
    try {
      const entity = await this.baseService.findOneById(id);
      if (!entity) {
        throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        data: entity,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Roles('BASIC')
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    try {
      const data = await this.baseService.delete(id);
      if (data.affected === 0) {
        throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        data: data,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
