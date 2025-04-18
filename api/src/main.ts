import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

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
	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
