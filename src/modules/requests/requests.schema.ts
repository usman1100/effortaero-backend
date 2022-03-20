import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RequestStatus } from './requests.types';

@Schema({ timestamps: true })
export class Request {
    @Prop({
        required: true,
        type: String,
        length: 24,
        ref: 'User',
    })
    sender: string;

    @Prop({
        required: true,
        type: String,
        length: 24,
        ref: 'User',
    })
    receiver: string;

    @Prop({
        required: true,
        type: String,
        length: 24,
        ref: 'Organization',
    })
    orgID: string;

    @Prop({
        type: String,
        required: true,
        enum: RequestStatus,
    })
    status: RequestStatus;

    @Prop({
        type: String,
        required: false,
    })
    message: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
