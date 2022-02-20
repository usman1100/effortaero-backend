import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
    @Get()
    getHello(@Res() res: Response) {
        return res.json({
            message: 'Welcome to EffortAero REST API',
            version: '1.0.0',
        });
    }
}
