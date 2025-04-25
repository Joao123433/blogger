import { CreatePostDto } from './create-posts.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
