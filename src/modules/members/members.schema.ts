import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../auth/roles/role.type';

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
        enum: Role,
    })
    role: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
