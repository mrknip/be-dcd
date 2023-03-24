import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { getRandomInRange } from 'src/utils';
import { ImageMetadata } from './image.interface';

const stubData = [
  {
    id: 1,
    uri: 'assets/dogs/dog1.jpg',
    species: 'dog',
    description: 'A good boi',
  },
  {
    id: 2,
    uri: 'assets/dogs/dog2.jpg',
    species: 'dog',
    description: 'What a good dog',
  },
  {
    id: 3,
    uri: 'assets/dogs/dog3.jpg',
    species: 'dog',
    description: 'A handsome dog',
  },
  {
    id: 4,
    uri: 'assets/dogs/dog4.jpg',
    species: 'dog',
    description: 'A dog having fun',
  },
  {
    id: 5,
    uri: 'assets/dogs/dog5.jpg',
    species: 'dog',
    description: 'Just a dog',
  },
  {
    id: 6,
    uri: 'assets/cats/cat1.jpg',
    species: 'cat',
    description: 'Just a cat',
  },
  {
    id: 7,
    uri: 'assets/cats/cat2.jpg',
    species: 'cat',
    description: 'A cat, plotting',
  },
  {
    id: 8,
    uri: 'assets/cats/cat3.jpg',
    species: 'cat',
    description: 'A cat, having a good time',
  },
  { id: 9, uri: 'assets/cats/cat4.jpg', species: 'cat', description: 'A cat' },
  { id: 10, uri: 'assets/cats/cat5.jpg', species: 'cat', description: 'A cat' },
  {
    id: 11,
    uri: 'assets/ducks/duck1.jpg',
    species: 'duck',
    description: 'A duck, possibly dangerous',
  },
  {
    id: 12,
    uri: 'assets/ducks/duck2.jpg',
    species: 'duck',
    description: 'A duck, possibly a mallard',
  },
  {
    id: 13,
    uri: 'assets/ducks/duck3.jpg',
    species: 'duck',
    description: 'A duck',
  },
  {
    id: 14,
    uri: 'assets/ducks/duck4.jpg',
    species: 'duck',
    description: 'An angry-looking duck',
  },
  {
    id: 15,
    uri: 'assets/ducks/duck5.jpg',
    species: 'duck',
    description: 'A happy-looking duck',
  },
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
