import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export enum EstimationType {
    ML = 'ml',
    UCP = 'ucp',
    DELPHI = 'delphi',
}
export interface EstimationInterface {
    _id: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    value: number;
    description: string;
    estimationType: EstimationType;
}

export type EstimationDocument = Estimation & Document;

@Schema()
export class Estimation {
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
    })
    createdBy: string;

    @Prop({
        type: Number,
        required: true,
    })
    value: number;

    @Prop({
        type: String,
        maxlength: 200,
        minlength: 2,
        required: false,
    })
    description: string;

    @Prop({
        type: String,
        enum: EstimationType,
        required: true,
    })
    estimationType: EstimationType;
}

export const EstimationSchema = SchemaFactory.createForClass(Estimation);
