import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum ActorComplexity {
    Simple = 'simple',
    Average = 'average',
    Complex = 'complex',
}

@Schema({ timestamps: true })
export class Actor {
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

    @Prop({
        type: String,
        enum: ActorComplexity,
        default: ActorComplexity.Simple,
    })
    complexity: ActorComplexity;
}

export const ActorSchema = SchemaFactory.createForClass(Actor);
