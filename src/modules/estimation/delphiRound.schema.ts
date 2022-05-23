import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import {
    Contribution,
    ContributionSchema,
} from './subschemas/contribution.schema';

export type DelphiRoundDocument = DelphiRound & Document;

@Schema({
    timestamps: true,
})
export class DelphiRound {
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'Project',
    })
    projectID: string;

    @Prop({
        type: Boolean,
        default: false,
    })
    hasEnded: boolean;

    @Prop({
        required: true,
        type: [ContributionSchema],
        default: [],
    })
    contributions: Contribution[];

    @Prop({
        type: Number,
    })
    value: number;
}

export const DelphiRoundSchema = SchemaFactory.createForClass(DelphiRound);
