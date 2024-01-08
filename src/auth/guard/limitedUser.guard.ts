//limitedUser.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LimitedUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const idParam = context.getArgs()[0].params.id;

    if (!request.user.admin && idParam !== request.user.id)
      throw new UnauthorizedException('Unauthorized admin access');

    return true;
  }
}
