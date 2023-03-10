import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../commons/service.base';
import { ProjectsEntity } from '../entities/projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsDto, ProjectsUpdatedDto } from '../dto/projects.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService extends BaseService<ProjectsEntity> {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
  ) {
    super(projectRepository);
  }
  getEntityName(): string {
    return 'ProjectEntity';
  }

  mapToEntity(dto: ProjectsDto | ProjectsUpdatedDto): ProjectsEntity {
    return Object.assign(new ProjectsEntity(), dto);
  }
}
