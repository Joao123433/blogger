import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from 'src/commom/middlewares/logger.middleware';
import { CommentsModule } from 'src/comments/comments.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'node:path';

@Module({
	imports: [
		PostsModule, 
		UsersModule, 
		AuthModule, 
		CommentsModule,
		ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'files'),
			serveRoot: "/files"
    }),
	],
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
