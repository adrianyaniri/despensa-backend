import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../commons/service.base';
import { ProjectsEntity } from '../entities/projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsDto, ProjectsUpdatedDto } from '../dto/projects.dto';
import { Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from '../../../utils/error.manager';
import { UserProjectsEntity } from '../../users/entities/userProjects.entity';
import { UsersService } from '../../users/services/users.service';
import { ACCESS_LEVELS } from '../../../constants/ROLES';

@Injectable()
export class ProjectService extends BaseService<ProjectsEntity> {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
    @InjectRepository(UserProjectsEntity)
    private readonly userProjectsRepository: Repository<UserProjectsEntity>,
    private readonly usersService: UsersService,
  ) {
    super(projectRepository);
  }

  public async createProject(body: ProjectsDto, userId: string): Promise<any> {
    try {
      const user = await this.usersService.findUserById(userId);
      const project = await this.projectRepository.save(body);
      return await this.userProjectsRepository.save({
        accessLevel: ACCESS_LEVELS.OWNER,
        user,
        project,
      });
    } catch (error) {
      new ErrorManager.CreateSignatureError(error.message);
    }
  }

  public async updateProjectById(
    id: string,
    body: ProjectsUpdatedDto,
  ): Promise<UpdateResult> {
    try {
      const data: UpdateResult = await this.projectRepository.update(id, body);
      if (data.affected === 0) {
        new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Update failed',
        });
      }
      return data;
    } catch (error) {
      new ErrorManager.CreateSignatureError(error.message);
    }
  }

  async findOneById(id: string): Promise<ProjectsEntity> {
    try {
      const project = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .leftJoinAndSelect('project.usersIncludes', 'usersIncludes')
        .leftJoinAndSelect('usersIncludes.user', 'user')
        .getOne();
      if (!project) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `Project by id ${id}not found in database or deleted`,
        });
      }
      return project;
    } catch (error) {}
  }
  getEntityName(): string {
    return 'ProjectEntity';
  }

  mapToEntity(dto: ProjectsDto | ProjectsUpdatedDto): ProjectsEntity {
    return Object.assign(new ProjectsEntity(), dto);
  }
}
