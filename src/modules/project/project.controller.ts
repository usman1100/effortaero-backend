import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesAllowed } from '../auth/roles/role.decorator';
import { RolesGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.type';
import { ProjectService } from './project.service';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post('create')
    @RolesAllowed(Role.MANAGER)
    async create(@Req() req, @Res() res: Response) {
        const { name } = req.body;

        const projectInfo = {
            name,
            createdBy: req?.user?.id,
        };

        const response = await this.projectService.create(projectInfo);
        return res.status(response.code).json(response);
    }
}
