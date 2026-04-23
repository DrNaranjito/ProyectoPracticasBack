import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../Decorator/roles.decorator';
import { Role } from '../Decorator/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }
  //El reflector es el que va a permitirme leer roles.

  canActivate(
    context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    //Consigue la información del usuario para ver que rol tiene

    return roles.some((role) => user.roles?.includes(role));
    //Si tiene el rol que se usa en el controlador que se está intentando entrar el metodo devuleve true, sino devulve false
  }

}

