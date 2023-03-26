import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getImageData } from '../data/imageData';
import { getRandomInRange } from '../utils';
import { ImageMetadata } from './image.interface';

@Injectable()
export class ImageService {
  private images: ImageMetadata[] = getImageData();

  public getRandom({
    species,
    count = 5,
  }: {
    species?: string;
    count: number;
  }) {
    const images = species ? this.getImagesBySpecies(species) : this.images;

    if (images.length < count) {
      throw new BadRequestException('Insufficient images for request');
    }

    const indices = getRandomInRange(0, images.length, count);

    return indices.map((index: number) => images[index]);
  }

  public findOne(id: number) {
    const image = this.images.find((image) => image.id === id);

    if (!image) {
      throw new NotFoundException(`Image not found with id ${id}`);
    }

    return image;
  }

  private getImagesBySpecies(species: string) {
    return this.images.filter((i) => i.species === species);
  }
}
