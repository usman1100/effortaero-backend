import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './members.schema';
import { MemberService } from './members.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Member.name, schema: MemberSchema },
        ]),
    ],
    exports: [MemberService, MemberModule],
    providers: [MemberService],
})
export class MemberModule {}
