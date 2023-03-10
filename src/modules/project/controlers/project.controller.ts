import { Controller } from '@nestjs/common';
import { ControllerBase } from '../../../commons/controller.base';
import { ProjectsEntity } from '../entities/projects.entity';
import { ProjectService } from '../services/project.service';

@Controller('project')
export class ProjectController extends ControllerBase<ProjectsEntity> {
  constructor(private readonly projectService: ProjectService) {
    super(projectService);
  }
}
