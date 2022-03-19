import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({
        required: true,
        type: String,
        maxlength: 30,
        minlength: 2,
    })
    name: string;

    @Prop({
        unique: true,
        required: true,
        type: String,
        maxlength: 40,
        minlength: 2,
    })
    email: string;

    @Prop({
        required: true,
        type: String,
    })
    password: string;

    @Prop({
        required: true,
        enum: ['user', 'owner'],
    })
    role: string;

    // organization: ref to Organization
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'Organization',
    })
    organization: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
