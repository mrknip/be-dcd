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
    return this.imageService.getRandom(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.findOne(id);
  }
}
