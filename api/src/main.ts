import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import multipart from '@fastify/multipart';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter()
	);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // remove os campos que nao estao no dto
		}),
	);

	await app.register(multipart)

	const configSwagger = new DocumentBuilder()
		.setTitle("Blog")
		.setDescription("API Nestjs + Fastify + Prisma + Swagger")
		.addBearerAuth()
		.setVersion("1.0")
		.build()

	const documentFactory = () => SwaggerModule.createDocument(app, configSwagger)
	SwaggerModule.setup('docs', app, documentFactory)

	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
