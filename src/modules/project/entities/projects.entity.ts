import { BaseEntity } from '../../../config/base.entity';
import { IProject } from '../../../interface/project.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserProjectsEntity } from '../../users/entities/userProjects.entity';

@Entity('projects')
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  description: string;
  @Column()
  name: string;

  @OneToMany(() => UserProjectsEntity, (userProject) => userProject.project)
  usersIncludes: UserProjectsEntity[];
}
