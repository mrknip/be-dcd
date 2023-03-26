import { Module } from '@nestjs/common';
import { ImageController } from './image/image.controller';
import { ImageModule } from './image/image.module';
import { ImageService } from './image/image.service';

@Module({
  imports: [ImageModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class AppModule {}
