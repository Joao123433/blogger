import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { ApiExceptionFilter } from 'src/commom/filters/exception-filter';

@Module({
	imports: [PrismaModule],
	controllers: [PostsController],
	providers: [PostsService],
})
export class PostsModule {}
