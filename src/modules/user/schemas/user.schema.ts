import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
        enum: ['developer', 'manager', 'owner'],
    })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
