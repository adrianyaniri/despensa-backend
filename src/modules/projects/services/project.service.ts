import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../commons/service.base';
import { ProjectsEntity } from '../entities/projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsDto, ProjectsUpdatedDto } from '../dto/projects.dto';
import { Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from '../../../utils/error.manager';

@Injectable()
export class ProjectService extends BaseService<ProjectsEntity> {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
  ) {
    super(projectRepository);
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

  getEntityName(): string {
    return 'ProjectEntity';
  }

  mapToEntity(dto: ProjectsDto | ProjectsUpdatedDto): ProjectsEntity {
    return Object.assign(new ProjectsEntity(), dto);
  }
}
