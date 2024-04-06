import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { TypeOrmExceptionFilter } from './exception';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
        abortOnError: false,
    });

    // setup swagger
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Melotone API')
        .setDescription('The Melotone API description')
        .setVersion('1.0')
        .build();
    SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

    // use class-validator for validation
    app.useGlobalPipes(new ValidationPipe());

    // use helmet for security
    app.use(helmet());

    app.use(cookieParser())

    // enable cors
    app.enableCors();

    // set up a database error handling middleware
    app.useGlobalFilters(new TypeOrmExceptionFilter());

    // start the app
    await app.listen(3000);
}
bootstrap();
