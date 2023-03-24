import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { getRandomInRange } from 'src/utils';
import { ImageMetadata } from './image.interface';

const stubData = [
  { id: 1, uri: 'public/1.png', species: 'dog' },
  { id: 2, uri: 'public/2.png', species: 'cat' },
  { id: 3, uri: 'public/3.png', species: 'duck' },
  { id: 4, uri: 'public/4.png', species: 'dog' },
  { id: 5, uri: 'public/5.png', species: 'dog' },
  { id: 6, uri: 'public/6.png', species: 'dog' },
  { id: 7, uri: 'public/7.png', species: 'dog' },
  { id: 8, uri: 'public/8.png', species: 'cat' },
  { id: 9, uri: 'public/9.png', species: 'cat' },
  { id: 10, uri: 'public/10.png', species: 'cat' },
  { id: 11, uri: 'public/11.png', species: 'cat' },
  { id: 12, uri: 'public/12.png', species: 'duck' },
  { id: 13, uri: 'public/13.png', species: 'duck' },
  { id: 14, uri: 'public/14.png', species: 'duck' },
  { id: 15, uri: 'public/15.png', species: 'duck' },
];

@Injectable()
export class ImageService {
  private images: ImageMetadata[] = stubData;

  public getRandom(species?: string, count = 5) {
    const images = species ? this.getImagesBySpecies(species) : this.images;

    if (images.length < count) {
      throw new NotAcceptableException('Insufficient images for request');
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
