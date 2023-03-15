import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ControllerBase } from '../../../commons/controller.base';
import { ProjectsEntity } from '../entities/projects.entity';
import { ProjectService } from '../services/project.service';
import { ProjectsDto, ProjectsUpdatedDto } from '../dto/projects.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

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

  @Roles('CREATOR')
  @Post('create/userOwner/:id')
  public async createProjectWithUserOwner(
    @Body() body: ProjectsDto,
    @Param('id') userId: string,
  ) {
    return await this.projectService.createProject(body, userId);
  }
}
