import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AdvancedSearchDto {
  @IsString()
  @IsOptional()
  name?: string;

  // Search by team, category, universe, status and force
  @IsString()
  @IsOptional()
  team?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  universe?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNumber()
  @IsOptional()
  strength?: number;
}
