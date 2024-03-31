import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
        abortOnError: false,
    });

    const config = new DocumentBuilder()
        .setTitle('Melotone API')
        .setDescription('The Melotone API description')
        .setVersion('1.0')
        .build();

    SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

    // use class-validator for validation
    app.useGlobalPipes(new ValidationPipe());

    // use helmet for security
    app.use(helmet());

    await app.listen(3000);
}
bootstrap();
