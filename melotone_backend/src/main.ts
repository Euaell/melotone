import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['error', 'warn', 'log'],
        abortOnError: false,
    });

    const config = new DocumentBuilder()
        .setTitle('Melotone API')
        .setDescription('The Melotone API description')
        .setVersion('1.0')
        .build();

    SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

    await app.listen(3000);
}
bootstrap();
