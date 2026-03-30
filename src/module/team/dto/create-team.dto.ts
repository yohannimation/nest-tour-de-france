import { IsString, Length } from "class-validator";

export class CreateTeamDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsString()
  @Length(2, 100)
  country: string;
}
