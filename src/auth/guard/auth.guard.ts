import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Verificamos el token usando la configuración del JwtModule (secret + expiración)
      const payload = await this.jwtService.verifyAsync(token);

      /* 
        Si el token es válido, se decodifica y se guarda la información 
        dentro de request.user para que los controladores y guards 
        puedan saber quién está haciendo la petición
      */
      request.user = payload;

    } catch {
      // Si el token está manipulado, caducado o no coincide con la clave, lanza excepción
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    /*
      El split separa el header Authorization en dos partes:
      type: normalmente 'Bearer'
      token: el JWT real
      Solo aceptamos el token si el tipo es 'Bearer'
    */
    return type === 'Bearer' ? token : undefined;
  }

  /*
    En esta clase lo que estamos haciendo es verificar si el token que se ha pasado 
    a la petición es válido. Lo hacemos mediante el método canActivate, que es async 
    porque espera una promesa booleana. Si devuelve false, la petición no continúa; 
    si devuelve true, el controlador se ejecuta.
  */
}
