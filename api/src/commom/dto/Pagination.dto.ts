import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
	@IsOptional()
	@IsInt()
	@Min(6)
	@Max(6)
	@Type(() => Number)
	limit: number;

	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(6)
	@Type(() => Number)
	offset: number;
}
