import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesAllowed } from '../auth/roles/role.decorator';
import { RolesGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.type';
import { ProjectService } from './project.service';
import { CreateProjectDTO, GetOneProjectDTO } from './schemas/project.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post('')
    @RolesAllowed(Role.OWNER)
    async create(
        @Req() req,
        @Res() res: Response,
        @Body() info: CreateProjectDTO,
    ) {
        const userID = req.user.id;

        const response = await this.projectService.createNew(info, userID);
        return res.status(response.code).json(response);
    }

    @Get('')
    @RolesAllowed(Role.OWNER)
    async getAll(@Req() req, @Res() res: Response) {
        const id = req?.user?.id;

        const response = await this.projectService.getAll(id);
        return res.status(response.code).json(response);
    }

    @Get('/:id')
    @RolesAllowed(Role.OWNER)
    async getOne(@Param() params: GetOneProjectDTO, @Res() res: Response) {
        const response = await this.projectService.getOne(params.id);
        return res.status(response.code).json(response);
    }
}
