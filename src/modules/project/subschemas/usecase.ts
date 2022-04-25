import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum UseCaseComplexity {
    Simple = 'simple',
    Average = 'average',
    Complex = 'complex',
}

@Schema({ timestamps: true })
export class UseCase {
    // properties -> name, description, complexity, createdBy,

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
    description: string;

    // complexity: UseCaseComplexity;
    @Prop({
        type: String,
        enum: UseCaseComplexity,
        default: UseCaseComplexity.Simple,
    })
    complexity: UseCaseComplexity;
}

export const UseCaseSchema = SchemaFactory.createForClass(UseCase);
