import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesAllowed } from '../auth/roles/role.decorator';
import { RolesGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.type';
import { OrganizationService } from './organization.service';

@Controller('organizations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}
    @Post('create')
    @RolesAllowed(Role.OWNER)
    async create(@Req() req, @Res() res: Response) {
        const id = req?.user?.id;
        const { name } = req.body;

        const response = await this.organizationService.createNew({
            createdBy: id,
            name,
        });
        return res.status(response.code).json(response);
    }
}
