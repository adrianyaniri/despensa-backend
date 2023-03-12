import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserUpdatedDto, UserDto, UserToProjectDto } from '../dto/user.dto';
import { ErrorManager } from '../../../utils/error.manager';
import { UserProjectsEntity } from '../entities/userProjects.entity';
import { AgeService } from './ageService';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(UserProjectsEntity)
    private readonly userProjectsRepository: Repository<UserProjectsEntity>,
    private readonly ageService: AgeService,
  ) {}

  public async createUsers(body: UserDto): Promise<UserEntity> {
    try {
      const user = await this.usersRepository.create({
        ...body,
        fechaNacimiento: new Date(body.fechaNacimiento),
        edad: this.ageService.calculateAge(new Date(body.fechaNacimiento)),
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findUsers(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.usersRepository.find();
      if (users.length === 0) {
        new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return users;
    } catch (error) {
      new ErrorManager.CreateSignatureError(error.message);
    }
  }

  public async findUserById(id: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.usersRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
        .leftJoinAndSelect('projectsIncludes.project', 'project')
        .getOne();
      if (!user) {
        new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      }
      return user;
    } catch (error) {
      new ErrorManager.CreateSignatureError(error.message);
    }
  }

  public async updateUserById(
    id: string,
    body: UserUpdatedDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.usersRepository.update(id, body);
      if (user.affected === 0) {
        new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Update failed',
        });
      }
      return user;
    } catch (error) {
      new ErrorManager.CreateSignatureError(error.message);
    }
  }

  public async deleteUserById(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.usersRepository.delete(id);
      if (user.affected === 0) {
        new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Delete failed',
        });
      }
      return user;
    } catch (error) {
      new ErrorManager.CreateSignatureError(error.message);
    }
  }

  public async relationToProject(body: UserToProjectDto) {
    try {
      return await this.userProjectsRepository.save({ ...body });
      console.log(body);
    } catch (error) {
      throw new ErrorManager.CreateSignatureError(error.message);
    }
  }
}
