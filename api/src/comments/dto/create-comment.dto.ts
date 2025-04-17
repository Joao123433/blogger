import { IsNotEmpty, IsString } from "class-validator"

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  readonly comments: string

  @IsString()
  @IsNotEmpty()
  readonly postId: string
} 