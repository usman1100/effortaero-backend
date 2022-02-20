import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.type';

const matchRoles = (userRole: Role, requiredRoles: Role[]) => {
    return requiredRoles.includes(userRole);
};

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!roles) return true;

        const req = context.switchToHttp().getRequest();

        const userRole = req?.user?.role;

        return matchRoles(userRole, roles);
    }
}
