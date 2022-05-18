import { Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { EstimationService } from './estimation.service';
import { MLService } from './ml.service';

@Controller('estimations')
export class EstimationController {
    constructor(
        private readonly estimationService: EstimationService,
        private readonly mlService: MLService,
    ) {}

    @Delete('/:id')
    async deleteEstimation(@Res() res, @Param('id') id) {
        const response = await this.estimationService.deleteEstimation(id);
        return res.status(response.code).json(response);
    }

    @Post('/:projectId/ml')
    async predict(@Res() res, @Param('projectId') projectId) {
        const response = await this.mlService.predict(projectId);
        return res.status(response.code).json(response);
    }

    @Get('/:projectId/:estimationType')
    async projectEstimations(
        @Res() res,
        @Param('projectId') projectId,
        @Param('estimationType') estimationType,
    ) {
        const response = await this.mlService.projectEstimations(
            projectId,
            estimationType,
        );
        return res.status(response.code).json(response);
    }
}
