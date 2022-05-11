import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estimation } from './estimation.schema';

@Injectable()
export class MLService {
    constructor(
        @InjectModel(Estimation.name)
        private readonly estimationModel: Model<Estimation>,
    ) {}
}
