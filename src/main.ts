import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';
import { ResponseTransformer } from './pipes/responseTransformer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config('../');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalPipes(new ResponseTransformer());
    app.setGlobalPrefix('api');
    await app.listen(env.PORT || 3000);
}
bootstrap();
