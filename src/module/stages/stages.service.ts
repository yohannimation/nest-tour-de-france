import { Injectable } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stage } from './entities/stage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage) private stagesRepository: Repository<Stage>
  ) {}

  create(createStageDto: CreateStageDto) {
    return this.stagesRepository.save(createStageDto);
  }

  findAll() {
    return this.stagesRepository.find();
  }

  findOne(id: number) {
    return this.stagesRepository.findOneBy({ id });
  }

  update(id: number, updateStageDto: UpdateStageDto) {
    return this.stagesRepository.update(id, updateStageDto);
  }

  remove(id: number) {
    return this.stagesRepository.delete(id);
  }
}
