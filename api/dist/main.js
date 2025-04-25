"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app/app.module");
const multipart_1 = require("@fastify/multipart");
const core_1 = require("@nestjs/core");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    await app.register(multipart_1.default);
    const configSwagger = new swagger_1.DocumentBuilder()
        .setTitle("Blog")
        .setDescription("API Nestjs + Fastify + Prisma + Swagger")
        .addBearerAuth()
        .setVersion("1.0")
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, configSwagger);
    swagger_1.SwaggerModule.setup('docs', app, documentFactory);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map