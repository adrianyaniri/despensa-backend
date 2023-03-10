import { UserProjectsEntity } from '../modules/users/entities/userProjects.entity';
import { DeepPartial } from 'typeorm';
import { UserToProjectDto } from '../modules/users/dto/user.dto';

export function convertToUserProjectEntity(
  dto: UserToProjectDto,
): DeepPartial<UserProjectsEntity> {
  return {
    accessLevel: dto.accessLevel,
    user: dto.userId,
    project: dto.projectId,
  };
}
