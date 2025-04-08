import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [PostsModule, UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
