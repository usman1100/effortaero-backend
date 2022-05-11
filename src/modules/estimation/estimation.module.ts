import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstimationController } from './estimation.controller';
import { EstimationSchema } from './estimation.schema';
import { EstimationService } from './estimation.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Estimation', schema: EstimationSchema },
        ]),
        EstimationModule,
    ],
    exports: [EstimationModule],
    providers: [EstimationService],
    controllers: [EstimationController],
})
export class EstimationModule {}
