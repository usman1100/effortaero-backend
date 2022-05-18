import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DelphiService } from './delphi.service';
import { AddContributionDTO, CreateDelphiRoundDTO } from './estimation.dto';

@Controller('/estimations/delphi')
@UseGuards(JwtAuthGuard)
export class DelphiController {
    constructor(private readonly delphiService: DelphiService) {}

    @Post('/')
    async createOne(@Res() res, @Body() body: CreateDelphiRoundDTO) {
        const response = await this.delphiService.createOne(body);
        return res.status(response.code).json(response);
    }

    @Put('/:id')
    async addContribution(
        @Res() res,
        @Body() body: AddContributionDTO,
        @Req() req,
    ) {
        const userID = req.user.id;
        const response = await this.delphiService.addContribution({
            ...body,
            userID,
        });
        return res.status(response.code).json(response);
    }

    @Get('/project/:projectId')
    async findByProject(@Res() res, @Param('projectId') projectId) {
        const response = await this.delphiService.findByProjectId(projectId);
        return res.status(response.code).json(response);
    }
}
