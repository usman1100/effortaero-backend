import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Actor, ActorSchema } from '../subschemas/actor';
import { UseCase, UseCaseSchema } from '../subschemas/usecase';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
    // Fields
    // name, createdBy, developers[], actors[], useCases[],

    @Prop({
        required: true,
        type: String,
        maxlength: 200,
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
        type: MongooseSchema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    })
    organization: string;

    @Prop({
        type: [ActorSchema],
        default: [],
    })
    actors: Actor[];

    // use cases
    @Prop({
        type: [UseCaseSchema],
        default: [],
    })
    useCases: UseCase[];

    @Prop({
        required: false,
        type: Number,
    })
    tcf: number;

    @Prop({
        required: false,
        type: Number,
    })
    ecf: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
