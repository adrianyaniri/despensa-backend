import { BaseEntity, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async create(entity: T): Promise<T> {
    try {
      return await this.repository.save(entity);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<T[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneById(id: string): Promise<T> {
    try {
      const entity = await this.repository
        .createQueryBuilder()
        .where({ id })
        .getOne();
      if (!entity) {
        throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
      }
      return entity;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateById(
    id: string,
    dto: T,
    entity: typeof BaseEntity,
  ): Promise<UpdateResult | undefined> {
    try {
      const result = await entity.update(id, dto);
      if (result.affected !== 0) {
        throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      const data: DeleteResult = await this.repository.delete(id);
      if (data.affected === 0) {
        return data;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  // Metodos abstractos que deben ser implementados por las clases que hereden de esta
  abstract getEntityName(): string;
  abstract mapToEntity(dto: T): T;
}
