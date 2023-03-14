import { Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controlers/project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { UserProjectsEntity } from '../users/entities/userProjects.entity';
import { UsersService } from '../users/services/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { AgeService } from '../users/services/ageService';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectsEntity, UserProjectsEntity, UserEntity]),
  ],
  providers: [ProjectService, UsersService, AgeService],
  controllers: [ProjectController],
  exports: [ProjectService, TypeOrmModule],
})
export class ProjectModule {}
