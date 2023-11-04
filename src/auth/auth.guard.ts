import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Aquí implementa la lógica de autenticación
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false; // El usuario no está autenticado
    }
    return true; // El usuario está autenticado  }
  }
}
