import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../config/base.entity';
import { ACCESS_LEVELS } from '../../../constants/ROLES';
import { ProjectsEntity } from '../../project/entities/projects.entity';
import { UserEntity } from './user.entity';

@Entity('user_projects')
export class UserProjectsEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ACCESS_LEVELS,
  })
  accessLevel: ACCESS_LEVELS;

  @ManyToOne(() => UserEntity, (user) => user.projectsIncludes)
  user: UserEntity;

  @ManyToOne(() => ProjectsEntity, (project) => project.usersIncludes)
  project: ProjectsEntity;
}
