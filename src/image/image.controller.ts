import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('/random')
  getRandom(@Query('species') species: string, @Query('count') count: number) {
    return this.imageService.getRandom(species, count);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.findOne(id);
  }
}
