import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('rankings')
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRankingDto: CreateRankingDto) {
    return this.rankingsService.create(createRankingDto);
  }

  @Get()
  findAll() {
    return this.rankingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rankingsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRankingDto: UpdateRankingDto) {
    return this.rankingsService.update(+id, updateRankingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rankingsService.remove(+id);
  }
}
