import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/services/users.service';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../../../constants';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'PUBLIC_KEY',
      context.getHandler(),
    );

    if (isPublic) return true;

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      'ROLES_KEY',
      context.getHandler(),
    );

    const admin = this.reflector.get<string>('ADMIN_KEY', context.getHandler());

    const request = context.switchToHttp().getRequest<Request>();
    const { roleUser } = request;

    if (roles === undefined) {
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
    if (roleUser === ROLES.ADMIN) {
      return true;
    }

    const isAuth = roles.some((role) => role === roleUser);
    if (!isAuth) {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }
    return true;
  }
}
