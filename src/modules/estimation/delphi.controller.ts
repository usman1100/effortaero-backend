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

    @Get('/round/:id')
    async findOne(@Res() res, @Param('id') id) {
        const response = await this.delphiService.findOne(id);
        return res.status(response.code).json(response);
    }

    @Put('/:id')
    async addContribution(
        @Res() res,
        @Body() body: AddContributionDTO,
        @Req() req,
        @Param('id') id,
    ) {
        const userID = req?.user?.id;
        const response = await this.delphiService.addContribution(
            body,
            id,
            userID,
        );
        return res.status(response.code).json(response);
    }

    @Post('/')
    async createOne(@Res() res, @Body() body: CreateDelphiRoundDTO) {
        const response = await this.delphiService.createOne(body);
        return res.status(response.code).json(response);
    }

    @Post('/:id/end')
    async endRound(@Res() res, @Param('id') id) {
        const response = await this.delphiService.endRound(id);
        return res.status(response.code).json(response);
    }

    @Get('/project/:projectId')
    async findByProject(@Res() res, @Param('projectId') projectId) {
        const response = await this.delphiService.findByProjectId(projectId);
        return res.status(response.code).json(response);
    }
}
