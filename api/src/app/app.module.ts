import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';
import { LoggerMiddleware } from 'src/commom/middlewares/logger.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMiddleware } from 'src/commom/middlewares/auth.middleware';

@Module({
	imports: [PostsModule, UsersModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes({
			path: "*",
			method: RequestMethod.ALL
		})
		// consumer.apply(AuthMiddleware).forRoutes({
		// 	path: "*",
		// 	method: RequestMethod.ALL
		// })
	}
}
