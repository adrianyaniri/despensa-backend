import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ControllerBase } from '../../../commons/controller.base';
import { ProjectsEntity } from '../entities/projects.entity';
import { ProjectService } from '../services/project.service';
import { ProjectsUpdatedDto } from '../dto/projects.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';

@Controller('projects')
@UseGuards(AuthGuard, AccessLevelGuard, RolesGuard)
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
