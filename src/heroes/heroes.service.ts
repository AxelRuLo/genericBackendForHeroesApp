import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Hero } from './entities/hero.entity';
import { heroesData } from 'src/data/heroes.data';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AdvancedSearchDto } from './dto/advande-search.dto';

@Injectable()
export class HeroesService {
  private heroes: Hero[] = structuredClone(heroesData);

  create(createHeroDto: CreateHeroDto) {
    const hero = {
      ...createHeroDto,
      id: `${this.heroes.length + 1}`,
      slug: createHeroDto.name.toLowerCase().replace(/ /g, '-'),
    };

    this.heroes.push(hero);

    return hero;
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 6, offset = 0 } = paginationDto;

    const heroes = this.heroes.slice(offset, offset + limit);

    return {
      total: this.heroes.length,
      pages: Math.ceil(this.heroes.length / limit),
      heroes,
    };
  }

  findOne(idOrSlug: string) {
    const hero = this.heroes.find(
      (hero) => hero.id === idOrSlug || hero.slug === idOrSlug,
    );

    if (!hero) {
      throw new NotFoundException('Hero not found');
    }

    return hero;
  }

  update(id: string, updateHeroDto: UpdateHeroDto) {
    const hero = this.findOne(id);

    return {
      ...hero,
      ...updateHeroDto,
    };
  }

  remove(id: string) {
    const hero = this.findOne(id);

    this.heroes = this.heroes.filter((hero) => hero.id !== id);

    return hero;
  }

  findByAdvancedSearch(advancedSearchDto: AdvancedSearchDto) {
    const { name, team, category, universe, status, strength } =
      advancedSearchDto;

    if (!name && !team && !category && !universe && !status && !strength) {
      throw new BadRequestException(
        'At least one search parameter is required',
      );
    }

    let filteredHeroes = [...this.heroes];

    if (name) {
      filteredHeroes = filteredHeroes.filter(
        (hero) =>
          hero.name.toLowerCase().includes(name.toLowerCase()) ||
          hero.alias.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (team) {
      filteredHeroes = filteredHeroes.filter((hero) =>
        hero.team.toLowerCase().includes(team.toLowerCase()),
      );
    }

    if (category) {
      filteredHeroes = filteredHeroes.filter((hero) =>
        hero.category.toLowerCase().includes(category.toLowerCase()),
      );
    }

    if (universe) {
      filteredHeroes = filteredHeroes.filter((hero) =>
        hero.universe.toLowerCase().includes(universe.toLowerCase()),
      );
    }

    if (status) {
      filteredHeroes = filteredHeroes.filter((hero) =>
        hero.status.toLowerCase().includes(status.toLowerCase()),
      );
    }

    if (strength) {
      filteredHeroes = filteredHeroes.filter(
        (hero) => hero.strength >= strength,
      );
    }

    return filteredHeroes.sort((a, b) => a.name.localeCompare(b.name));
  }
}
