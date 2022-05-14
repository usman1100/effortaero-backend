import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { EstimationService } from './estimation.service';
import { MLService } from './ml.service';

@Controller('estimation')
export class EstimationController {
    constructor(
        private readonly estimationService: EstimationService,
        private readonly mlService: MLService,
    ) {}

    @Get('test')
    async test() {
        return this.estimationService.test();
    }

    @Get('/:projectId/ml')
    async predict(@Res() res, @Param('projectId') projectId) {
        const response = await this.mlService.predict(projectId);
        return res.status(response.code).json(response);
    }
}
