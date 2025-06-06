import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	readonly title: string;

	@IsString()
	@IsNotEmpty()
	readonly introduction: string;

	@IsString()
	@IsNotEmpty()
	readonly story: string;

	@IsString()
	@IsNotEmpty()
	readonly conclusion: string;
}
