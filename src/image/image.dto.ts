import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export enum SPECIES {
  DOG = 'dog',
  CAT = 'cat',
  DUCK = 'duck',
}

export class GetRandomDTO {
  @IsEnum(SPECIES)
  @IsOptional()
  public species?: SPECIES;

  @Transform(({ value }) => Number.parseInt(value))
  @IsInt()
  @IsOptional()
  public count? = 5;
}
