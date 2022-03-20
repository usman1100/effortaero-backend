import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../base/base.service';
import { Request } from './requests.schema';

@Injectable()
export class RequestService extends BaseService<Request> {
    constructor(
        @InjectModel(Request.name)
        private readonly requestModel: Model<Request>,
    ) {
        super(requestModel);
    }
}
