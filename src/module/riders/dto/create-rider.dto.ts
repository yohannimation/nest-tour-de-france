import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class CreateRiderDto {
  @IsString()
  name: string;

  @IsString()
  nationality: string;

  @Type(() => Number)
  @IsInt({ message: 'teamId must be number' })
  teamId: number;
}
