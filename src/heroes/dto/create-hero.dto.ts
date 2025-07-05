import { IsNotEmpty, IsString, IsArray, IsNumber } from 'class-validator';

export class CreateHeroDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  alias: string;

  @IsArray()
  @IsString({ each: true })
  powers: string[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNumber()
  strength: number;

  @IsNumber()
  intelligence: number;

  @IsNumber()
  speed: number;

  @IsNumber()
  durability: number;

  @IsNotEmpty()
  @IsString()
  team: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  firstAppearance: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  universe: string;
}
