import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { SPECIES } from './image.interface';

export class GetRandomDTO {
  @IsEnum(SPECIES)
  @IsOptional()
  public species?: SPECIES;

  @IsInt()
  @IsOptional()
  public count? = 5;
}
