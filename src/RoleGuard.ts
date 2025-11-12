import { Reflector } from '@nestjs/core';
import { Roles } from './decorator/role.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(this.reflector.get(Roles, context.getHandler()));
    return true;
    // throw new Error('Method not implemented.');
  }
}
