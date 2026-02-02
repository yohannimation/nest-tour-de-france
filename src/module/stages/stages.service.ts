import { Injectable } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';

@Injectable()
export class StagesService {
  private stages = [
    {
      id: 1,
      startCity: 'Embrun',
      endCity: 'Grenoble',
      distance: 203,
      altitude: 803,
    },
    {
      id: 2,
      startCity: 'Lyon',
      endCity: 'Grenoble',
      distance: 203,
      altitude: 803,
    },
  ];

  create(createStageDto: CreateStageDto) {
    return 'This action adds a new stage';
  }

  findAll() {
    return this.stages;
  }

  findOne(id: number) {
    return this.stages.find((stage) => stage.id === id);
  }

  update(id: number, updateStageDto: UpdateStageDto) {
    return `This action updates a #${id} stage`;
  }

  remove(id: number) {
    return `This action removes a #${id} stage`;
  }
}
