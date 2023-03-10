import { BaseService } from './service.base';
import {
  Body,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

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

  /*
  @Patch(':id')
  async updateById(@Param('id') id: string, @Body() body: T) {
    try {
      const entity = await this.baseService.updateById(id, body);
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
  */

  @Delete(':id')
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
