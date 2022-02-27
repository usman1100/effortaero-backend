import { Prop, Schema } from '@nestjs/mongoose';

export enum ActorComplexity {
    Simple = 'Simple',
    Average = 'Average',
    Complex = 'Complex',
}

@Schema({ timestamps: true })
export class Actor {
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
        enum: ActorComplexity,
        default: ActorComplexity.Simple,
    })
    complexity: ActorComplexity;

    @Prop({
        type: String,
        ref: 'User',
        required: true,
    })
    createdBy: string;
}
