import { Controller, Get, Res } from '@nestjs/common';
import { EstimationService } from './estimation.service';

@Controller('estimation')
export class EstimationController {
    constructor(private readonly estimationService: EstimationService) {}

    @Get('')
    async test(@Res() res) {
        const response = await this.estimationService.test();
        return res.json(response);
    }
}
