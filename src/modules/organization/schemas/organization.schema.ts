import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type OrganizationDocument = Organization & Document;

@Schema({ timestamps: true })
export class Organization {
    @Prop({
        required: true,
        type: String,
        maxlength: 30,
        minlength: 2,
    })
    name: string;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
        required: true,
    })
    createdBy: string;

    @Prop({
        type: [MongooseSchema.Types.ObjectId],
        ref: 'User',
        default: [],
    })
    members: string[];

    @Prop({
        type: [MongooseSchema.Types.ObjectId],
        ref: 'Project',
        default: [],
    })
    projects: string[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
