import { PrismaModule } from 'src/prisma/prisma.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Module } from '@nestjs/common';

@Module({
	imports: [PrismaModule],
	controllers: [PostsController],
	providers: [PostsService],
})
export class PostsModule {}
