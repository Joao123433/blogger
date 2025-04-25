import { CommentsController } from './comments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommentsService } from './comments.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
