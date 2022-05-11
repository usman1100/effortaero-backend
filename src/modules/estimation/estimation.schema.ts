import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export interface RootObject {
    SimpleActors: number;
    AverageActors: number;
    ComplexActors: number;
    UAW: number;
    SimpleUC: number;
    AverageUC: number;
    ComplexUC: number;
    UUCW: number;
    TCF: number;
    ECF: number;
    Effort: number;
}

export type UserDocument = Estimation & Document;

@Schema()
export class Estimation {
    // all fields in RootObject
    @Prop({
        required: true,
        type: Number,
    })
    SimpleActors: number;

    @Prop({
        required: true,
        type: Number,
    })
    AverageActors: number;

    @Prop({
        required: true,
        type: Number,
    })
    ComplexActors: number;

    @Prop({
        required: true,
        type: Number,
    })
    UAW: number;

    @Prop({
        required: true,
        type: Number,
    })
    SimpleUC: number;

    @Prop({
        required: true,
        type: Number,
    })
    AverageUC: number;

    @Prop({
        required: true,
        type: Number,
    })
    ComplexUC: number;

    @Prop({
        required: true,
        type: Number,
    })
    UUCW: number;

    @Prop({
        required: true,
        type: Number,
    })
    TCF: number;

    @Prop({
        required: true,
        type: Number,
    })
    ECF: number;

    @Prop({
        required: true,
        type: Number,
    })
    Effort: number;
}

export const EstimationSchema = SchemaFactory.createForClass(Estimation);
