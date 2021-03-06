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
import { AddMemberDTO } from './organization.dto';
import { OrganizationService } from './organization.service';

@Controller('organizations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Post('create')
    @RolesAllowed(Role.OWNER)
    async create(@Req() req, @Body() body, @Res() res: Response) {
        const id = req?.user?.id;

        const response = await this.organizationService.createNew({
            name: body.name,
            slogan: body.slogan,
            createdBy: id,
        });
        return res.status(response.code).json(response);
    }

    @Get('my')
    @RolesAllowed(Role.USER, Role.OWNER)
    async my(@Req() req, @Res() res: Response) {
        const response = await this.organizationService.myOrganization(
            req?.user?.id,
        );
        return res.status(response.code).json(response);
    }

    @RolesAllowed(Role.OWNER)
    @Get('created-orgs')
    async getCreatedOrgs(@Req() req, @Res() res: Response) {
        const userID = req?.user?.id;
        const response = await this.organizationService.getCreatedOrganizations(
            userID,
        );
        return res.status(response.code).json(response);
    }

    @RolesAllowed(Role.USER)
    @Get('joined')
    async getJoinedOrgs(@Req() req, @Res() res: Response) {
        const response = await this.organizationService.getJoinedOrgs(
            req?.user?.id,
        );
        return res.status(response.code).json(response);
    }

    @RolesAllowed(Role.OWNER)
    @Post('/:id/member/')
    async addMember(
        @Body() { userID }: AddMemberDTO,
        @Res() res: Response,
        @Param() { id },
    ) {
        const response = await this.organizationService.addMember(id, userID);

        return res.status(response.code).json(response);
    }

    @RolesAllowed(Role.OWNER)
    @Post('members')
    async getMembers(@Body() body, @Res() res) {
        const response = await this.organizationService.getMembers(body.orgID);
        return res.status(response.code).json(response);
    }

    @Get('/:id')
    async getOne(@Req() req, @Res() res: Response) {
        const response = await this.organizationService.getOne(req?.params?.id);
        return res.status(response.code).json(response);
    }
}
