import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ControllerBase } from '../../../commons/controller.base';
import { ProjectsEntity } from '../entities/projects.entity';
import { ProjectService } from '../services/project.service';
import { ProjectsUpdatedDto } from '../dto/projects.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';

@Controller('projects')
@UseGuards(AuthGuard, AccessLevelGuard)
export class ProjectController extends ControllerBase<ProjectsEntity> {
  constructor(private readonly projectService: ProjectService) {
    super(projectService);
  }

  @AccessLevel(50)
  @Put('update/:id')
  public async updateProjectById(
    @Param('id') id: string,
    @Body() body: ProjectsUpdatedDto,
  ) {
    return await this.projectService.updateProjectById(id, body);
  }
}
