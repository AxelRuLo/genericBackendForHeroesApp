import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { AdvancedSearchDto } from './dto/advande-search.dto';
import { Hero } from './entities/hero.entity';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroesService.create(createHeroDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.heroesService.findAll(paginationDto);
  }

  @Get('/summary')
  getDashboardData() {
    return this.heroesService.getHeroSummary();
  }

  @Get('/search')
  findByAdvancedSearch(
    @Query() advancedSearchDto: AdvancedSearchDto = {},
  ): Hero[] {
    return this.heroesService.findByAdvancedSearch(advancedSearchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroesService.update(id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroesService.remove(id);
  }
}
