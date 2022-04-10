import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const MemberSchema = SchemaFactory.createForClass(Member);
