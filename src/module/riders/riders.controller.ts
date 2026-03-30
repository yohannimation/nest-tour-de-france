import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RidersService } from './riders.service';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('riders')
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRiderDto: CreateRiderDto) {
    return this.ridersService.create(createRiderDto);
  }

  @Get()
  findAll() {
    return this.ridersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ridersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiderDto: UpdateRiderDto) {
    return this.ridersService.update(+id, updateRiderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ridersService.remove(+id);
  }
}
