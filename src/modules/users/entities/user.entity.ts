import { IUser } from '../../../interface/user.interfaces';
import { BaseEntity } from '../../../config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ROLES } from '../../../constants';
import { UserProjectsEntity } from './userProjects.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  age: number;
  @Column({ unique: true })
  email: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: ROLES,
  })
  role: ROLES;
  @Column({ unique: true })
  username: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => UserProjectsEntity, (userProject) => userProject.user)
  projectsIncludes: UserProjectsEntity[];
}
