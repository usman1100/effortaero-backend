import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    // Fields
    // name, createdBy, developers[], actors[], useCases[],

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
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
