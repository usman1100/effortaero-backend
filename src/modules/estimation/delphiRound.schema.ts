import { Injectable } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type DelphiRoundDocument = DelphiRound & Document;

@Schema()
@Injectable()
export class DelphiRound {
    @Prop({
        required: true,
        // type: MongooseSchema.Types.ObjectId,
        // ref: 'User',
        type: String,
    })
    name: string;
}

export const DelphiRoundSchema = SchemaFactory.createForClass(DelphiRound);
