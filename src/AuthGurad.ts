import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
    // const request: Request = context.switchToHttp().getRequest();
    // const { authorization } = request.headers || {};
    // if (authorization === 'admin1234') {
    //   return true;
    // } else {
    //   throw new UnauthorizedException('认证不通过');
    // }
  }
}
