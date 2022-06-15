import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export enum EstimationTypeEnum {
    ML = 'ml',
    UCP = 'ucp',
    DELPHI = 'delphi',
    ENSEMBLE = 'ensemble',
}
export interface EstimationInterface {
    _id: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    value: number;
    description: string;
    estimationType: EstimationTypeEnum;
}

export type EstimationDocument = Estimation & Document;

@Schema({
    timestamps: true,
})
export class Estimation {
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Project',
    })
    projectID: string;

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
        enum: EstimationTypeEnum,
        required: true,
    })
    estimationType: EstimationTypeEnum;
}

export const EstimationSchema = SchemaFactory.createForClass(Estimation);
