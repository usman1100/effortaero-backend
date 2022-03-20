import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema, Request } from './requests.schema';
import { RequestService } from './requests.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Request.name, schema: RequestSchema },
        ]),
    ],
    exports: [RequestService, RequestModule],
    providers: [RequestService],
})
export class RequestModule {}
