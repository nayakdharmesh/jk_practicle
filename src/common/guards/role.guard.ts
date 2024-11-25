
import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private jwtAuthGuard: JwtAuthGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const requiredRole = this.getRequiredRole(context);
    return user && user.role === requiredRole;
  }

  private getRequiredRole(context: ExecutionContext): string {
    const handler = context.getHandler();
    const role = Reflect.getMetadata('role', handler);
    return role;
  }
}
