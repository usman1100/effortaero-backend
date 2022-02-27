import { Prop, Schema } from '@nestjs/mongoose';

export enum UseCaseComplexity {
    Simple = 'Simple',
    Average = 'Average',
    Complex = 'Complex',
}

@Schema({ timestamps: true })
export class UseCase {
    // properties -> name, description, complexity, createdBy,

    @Prop({
        type: String,
        maxlength: 60,
        minlength: 2,
    })
    name: string;

    @Prop({
        type: String,
        maxlength: 200,
        minlength: 2,
    })
    description: string;

    // complexity: UseCaseComplexity;
    @Prop({
        type: String,
        enum: UseCaseComplexity,
        default: UseCaseComplexity.Simple,
    })
    complexity: UseCaseComplexity;

    @Prop({
        type: String,
        ref: 'User',
        required: true,
    })
    createdBy: string;
}
