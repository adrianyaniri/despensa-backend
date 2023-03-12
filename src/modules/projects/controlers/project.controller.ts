import { Body, Controller, Param, Put } from '@nestjs/common';
import { ControllerBase } from '../../../commons/controller.base';
import { ProjectsEntity } from '../entities/projects.entity';
import { ProjectService } from '../services/project.service';
import { ProjectsUpdatedDto } from '../dto/projects.dto';

@Controller('projects')
export class ProjectController extends ControllerBase<ProjectsEntity> {
  constructor(private readonly projectService: ProjectService) {
    super(projectService);
  }
  @Put('update/:id')
  public async updateProjectById(
    @Param('id') id: string,
    @Body() body: ProjectsUpdatedDto,
  ) {
    return await this.projectService.updateProjectById(id, body);
  }
}
