import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Contribution {
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
    })
    userID: string;

    @Prop({
        type: String,
        maxlength: 60,
        minlength: 2,
        required: true,
    })
    name: string;

    @Prop({
        type: String,
        required: false,
    })
    message: string;

    @Prop({
        required: true,
        type: Number,
    })
    value: number;
}

export const ContributionSchema = SchemaFactory.createForClass(Contribution);
