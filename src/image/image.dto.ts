import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { SPECIES } from './image.interface';

export class GetRandomDTO {
  @IsEnum(SPECIES)
  @IsOptional()
  public species?: SPECIES;

  @Transform(({ value }) => Number.parseInt(value))
  @IsInt()
  @IsOptional()
  public count? = 5;
}
