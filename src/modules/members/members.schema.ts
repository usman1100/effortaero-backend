import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MemberRoles } from './members.types';

@Schema({ timestamps: true })
export class Member {
    // userID, organizationID, role

    @Prop({
        required: true,
        type: String,
        length: 24,
        ref: 'User',
    })
    userID: string;

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
        enum: MemberRoles,
    })
    role: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
