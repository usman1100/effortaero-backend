import { InjectModel } from '@nestjs/mongoose';
import { Estimation } from './estimation.schema';
import { isValidObjectId, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { DelphiRound } from './delphiRound.schema';
import { Repo } from './repo.schema';
import {
    generateInternalServerError,
    generateSuccessResponse,
} from 'src/utils';

@Injectable()
export class EstimationService {
    @InjectModel(Estimation.name)
    private readonly estimationModel: Model<Estimation>;

    @InjectModel(DelphiRound.name)
    private readonly delphiRoundModel: Model<DelphiRound>;

    async test() {
        await this.delphiRoundModel.create({ name: 'test' });
        return this.estimationModel.find();
    }

    async deleteEstimation(id: string) {
        try {
            const response = await this.estimationModel.findByIdAndDelete(id);

            return generateSuccessResponse(response);
        } catch (error) {
            return generateInternalServerError(error);
        }
    }
}
