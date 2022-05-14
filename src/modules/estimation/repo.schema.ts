import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export interface RepoType {
    SA: number;
    AA: number;
    CA: number;
    UAW: number;
    SUC: number;
    AUC: number;
    CUC: number;
    UUCW: number;
    TCF: number;
    ECF: number;
    Effort: string;
}

export type RepoDocument = Repo & Document;

@Schema()
export class Repo {
    @Prop({
        type: Number,
    })
    SA: number;

    @Prop({
        type: Number,
    })
    AA: number;

    @Prop({
        type: Number,
    })
    CA: number;

    @Prop({
        type: Number,
    })
    UAW: number;

    @Prop({
        type: Number,
    })
    SUC: number;

    @Prop({
        type: Number,
    })
    AUC: number;

    @Prop({
        type: Number,
    })
    CUC: number;

    @Prop({
        type: Number,
    })
    UUCW: number;

    @Prop({
        type: Number,
    })
    TCF: number;

    @Prop({
        type: Number,
    })
    ECF: number;

    @Prop({
        type: String,
    })
    Effort: string;

    @Prop({
        type: Date,
        default: Date.now,
    })
    createdAt: Date;

    @Prop({
        type: Date,
        default: Date.now,
    })
    updatedAt: Date;
}

export const RepoSchema = SchemaFactory.createForClass(Repo);
