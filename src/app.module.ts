import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/effortaero"),

    UserModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
