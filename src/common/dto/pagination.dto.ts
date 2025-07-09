import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  offset?: number;

  @IsOptional()
  @IsString()
  category?: string;
}
