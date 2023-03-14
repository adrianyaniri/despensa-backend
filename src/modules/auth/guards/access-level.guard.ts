import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PUBLIC_KEY, ROLES } from '../../../constants';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UsersService } from '../../users/services/users.service';
import { ROLES_KEY } from '../../../constants/key-decorator';
import { ACCESS_LEVELS } from '../../../constants/ROLES';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const accessLevel = this.reflector.get<number>(
      'ACCESS_LEVEL_KEY',
      context.getHandler(),
    );

    const admin = this.reflector.get<string>('ADMIN_KEY', context.getHandler());
    const request = context.switchToHttp().getRequest<Request>();
    const { roleUser, idUser } = request;

    if (accessLevel === undefined) {
      if (!admin) {
        return true;
      } else if (admin && roleUser === admin) {
        return true;
      } else {
        throw new UnauthorizedException(
          'You do not have permission to access this resource',
        );
      }
    }
    if (roleUser === ROLES.ADMIN || roleUser === ROLES.CREATOR) {
      return true;
    }
    const user = await this.userService.findUserById(idUser);
    const userExistInProject = user.projectsIncludes.find(
      (project) => project.id === request.params.id,
    );
    if (
      ACCESS_LEVELS[accessLevel] > ACCESS_LEVELS[userExistInProject.accessLevel]
    ) {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
