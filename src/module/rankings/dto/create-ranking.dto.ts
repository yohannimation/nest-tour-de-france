import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class CreateRankingDto {
  @Type(() => Number)
  @IsInt()
  position: number;

  @Type(() => Number)
  @IsInt()
  riderId: number;
}
