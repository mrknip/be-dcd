import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { getRandomInRange } from 'src/utils';
import { ImageMetadata } from './image.interface';

const stubData = [
  { id: 1, uri: 'assets/dogs/dog1.jpg', species: 'dog' },
  { id: 2, uri: 'assets/dogs/dog2.jpg', species: 'dog' },
  { id: 3, uri: 'assets/dogs/dog3.jpg', species: 'dog' },
  { id: 4, uri: 'assets/dogs/dog4.jpg', species: 'dog' },
  { id: 5, uri: 'assets/dogs/dog5.jpg', species: 'dog' },
  { id: 6, uri: 'assets/cats/cat1.jpg', species: 'cat' },
  { id: 7, uri: 'assets/cats/cat2.jpg', species: 'cat' },
  { id: 8, uri: 'assets/cats/cat3.jpg', species: 'cat' },
  { id: 9, uri: 'assets/cats/cat4.jpg', species: 'cat' },
  { id: 10, uri: 'assets/cats/cat5.jpg', species: 'cat' },
  { id: 11, uri: 'assets/ducks/duck1.jpg', species: 'duck' },
  { id: 12, uri: 'assets/ducks/duck2.jpg', species: 'duck' },
  { id: 13, uri: 'assets/ducks/duck3.jpg', species: 'duck' },
  { id: 14, uri: 'assets/ducks/duck4.jpg', species: 'duck' },
  { id: 15, uri: 'assets/ducks/duck5.jpg', species: 'duck' },
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
