import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService:JwtService
    
  ){}
  async canActivate(  context: ExecutionContext  ): Promise<boolean>  {

      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
      throw new UnauthorizedException();
    }
 try {
      // 💡 Here the JWT secret key that's used for verifying the payload 
      // is the key that was passed in the JwtModule
      const payload = await this.jwtService.verifyAsync(token,
      {
        secret: jwtConstants.secret
        //Si no coincide con lo guardado en jwt.constants bajo la constante secret se queda pillado aquí y lanza la excepción
      }
    );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
    // request['user'] = payload;
    request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    //El split separa el string en un array, estamos separando el header para validarlo como token
    //Se separa la constante en el tipo y el token que han sido separados por el split
    return type === 'Bearer' ? token : undefined;
  }


  /*
  En esta clase lo que estamos haciendo es verificar si el toquen que se ha pasasdo a la peticion
  es valido y lo vamos hacer mediante un metodo CanActive el cual es async con lo que esta esperando
  una promesa de tipo booleana, si el resultado es falso no se resolverá la petición si es true si

  */
}
