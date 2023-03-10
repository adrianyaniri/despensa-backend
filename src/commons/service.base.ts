import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from '../utils/error.manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseService<T> {
  protected constructor(private readonly repository: Repository<T>) {}

  async create(entity: T): Promise<T> {
    try {
      return await this.repository.save(entity);
    } catch (error) {
      new ErrorManager.CreateSignatureError(error.message);
    }
  }

  async findAll(): Promise<T[]> {
    try {
      const data: T[] = await this.repository.find();
      if (data.length === 0) {
        new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No data found',
        });
      }
      return data;
    } catch (error) {
      new ErrorManager.CreateSignatureError(error.message);
    }
  }

  async findOneById(id: string): Promise<T> {
    try {
      const entity = await this.repository
        .createQueryBuilder()
        .where({ id })
        .getOne();
      if (!entity) {
        new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Entity not found',
        });
      }
      return entity;
    } catch (error) {
      new ErrorManager.CreateSignatureError(error.message);
    }
  }

  async updateById(id: string, body: T): Promise<UpdateResult | undefined> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = await this.repository.update(id, { ...body });
      if (result.affected !== 0) {
        new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Entity not found',
        });
      }
      return result;
    } catch (error) {
      new ErrorManager.CreateSignatureError(error.message);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      const data: DeleteResult = await this.repository.delete(id);
      if (data.affected === 0) {
        new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Delete failed',
        });
      }
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  // Metodos abstractos que deben ser implementados por las clases que hereden de esta
  abstract getEntityName(): string;
  abstract mapToEntity(dto: T): T;
}
