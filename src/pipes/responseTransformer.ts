import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ResponseTransformer implements PipeTransform {
    // get response object
    // and transform it to the expected format

    transform(value: any, metadata: ArgumentMetadata) {
        return { ...value, pp: 'poopoo' };
    }
}
