import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SPECIES } from './image.interface';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('/random')
  getRandom(
    @Query('species') species?: SPECIES,
    @Query('count') count?: number,
  ) {
    if (!Object.values(SPECIES).includes(species)) {
      throw new BadRequestException(`Unsupported species: ${species}`);
    }

    return this.imageService.getRandom(species, count);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.findOne(id);
  }
}
