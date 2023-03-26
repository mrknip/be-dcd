import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { GetRandomDTO } from './image.dto';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('/random')
  getRandom(@Query() query?: GetRandomDTO) {
    const { species, count } = query;

    return this.imageService.getRandom({ species, count });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.findOne(id);
  }
}
