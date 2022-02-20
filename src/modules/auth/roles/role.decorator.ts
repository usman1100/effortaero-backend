import { SetMetadata } from '@nestjs/common';
import { Role } from './role.type';

const RolesAllowed = (...roles: Role[]) => SetMetadata('roles', roles);

export { RolesAllowed };
