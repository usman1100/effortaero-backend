import { InjectModel } from '@nestjs/mongoose';
import { Estimation } from './estimation.schema';
import { isValidObjectId, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EstimationService {
    @InjectModel(Estimation.name)
    private readonly estimationModel: Model<Estimation>;

    async test() {
        return this.estimationModel.find();
    }
}
