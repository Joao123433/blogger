import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createId } from '@paralleldrive/cuid2';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ReponseGetComment, ResponseUpdateComment } from './dto/responses.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async findComments(postId: string): Promise<ReponseGetComment[]> {
    const comments = await this.prisma.comments.findMany({
      where: {
        postId: postId,
      },
    });

    return comments;
  }

  async createOne(body: CreateCommentDto, payloadToken: PayloadDto): Promise<ReponseGetComment> {
    try {
      const comment = await this.prisma.comments.create({
        data: {
          id: createId(),
          comment: body.comments,
          postId: body.postId,
          userId: payloadToken.sub
        }
      })

      return comment
    } catch (error) {
      throw new HttpException('Error creating comment', HttpStatus.BAD_REQUEST);
    }
  }

  async updateOne(id: string, body: UpdateCommentDto, payloadToken: PayloadDto): Promise<ResponseUpdateComment> {
    try {
      const findComment = await this.prisma.comments.findFirst({
        where: {
          id: id
        }
      })

      if(!findComment) throw new HttpException("Comment not found", HttpStatus.NOT_FOUND)

      if(findComment.userId !== payloadToken.sub) throw new HttpException("Access denied", HttpStatus.NOT_FOUND)

      const comment = await this.prisma.comments.update({
        data: {
          ...body,
          updated_at: new Date()
        },
        where: {
          id: findComment.id
        },
        select: {
          id: true,
          comment: true,
          created_at: true,
          updated_at: true,
        }
      })

      return comment
    } catch (error) {
			throw new HttpException('Error updating comment', HttpStatus.BAD_REQUEST);
    } 
  }

  async deleteOne(id: string, payloadToken: PayloadDto) {
    try {
      const findComment = await this.prisma.comments.findFirst({
        where: {
          id: id
        }
      })

      if(!findComment) throw new HttpException("Comment not found", HttpStatus.NOT_FOUND)

      if(findComment.userId !== payloadToken.sub) throw new HttpException("Access denied", HttpStatus.NOT_FOUND)

      await this.prisma.comments.delete({
        where: {
          id: findComment.id
        }
      })

      return { message: 'Comment deleted successfully' };
    } catch (error) {
			throw new HttpException('Error deleting comment', HttpStatus.BAD_REQUEST);
    }
  }
}
