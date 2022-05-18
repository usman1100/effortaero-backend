import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from '../project/project.module';
import { DelphiController } from './delphi.controller';
import { DelphiService } from './delphi.service';
import { DelphiRoundSchema } from './delphiRound.schema';
import { EstimationController } from './estimation.controller';
import { EstimationSchema } from './estimation.schema';
import { EstimationService } from './estimation.service';
import { MLService } from './ml.service';
import { RepoSchema } from './repo.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Estimation', schema: EstimationSchema },
        ]),
        MongooseModule.forFeature([
            { name: 'DelphiRound', schema: DelphiRoundSchema },
        ]),

        MongooseModule.forFeature([{ name: 'Repo', schema: RepoSchema }]),
        EstimationModule,
        ProjectModule,
    ],
    exports: [EstimationModule],
    providers: [EstimationService, MLService, DelphiService],
    controllers: [EstimationController, DelphiController],
})
export class EstimationModule {}
