import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';


const dotenv = require("dotenv")
dotenv.config("../");



async function bootstrap() {  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api');
  await app.listen(env.PORT ||  3000);
}
bootstrap();
