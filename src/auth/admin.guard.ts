// chat GTP
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Suponiendo que el usuario tiene un campo "role"

    // Verifica si el usuario es un administrador (puedes ajustar esta lógica según tu implementación)
    if (user && user.role === 'admin') {
      return true; // El usuario es un administrador
    }
    return false; // El usuario no es un administrador
  }
}
