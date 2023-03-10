import { Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controlers/project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { UserProjectsEntity } from '../users/entities/userProjects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity, UserProjectsEntity])],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService, TypeOrmModule],
})
export class ProjectModule {}
