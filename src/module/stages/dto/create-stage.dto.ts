import { IsNumber, IsString } from "class-validator";

export class CreateStageDto {
  @IsString()
  startCity: string;
  @IsString()
  endCity: string;
  @IsNumber()
  distance: number;
  @IsNumber()
  altitude: number;
}
