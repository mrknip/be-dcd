import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from './image.controller';
import { ImageMetadata, SPECIES } from './image.interface';
import { ImageService } from './image.service';

const mockData: ImageMetadata[] = [
  { id: 1, uri: 'dog1', species: 'dog', description: 'test' },
  { id: 2, uri: 'dog2', species: 'dog', description: 'test' },
  { id: 3, uri: 'cat1', species: 'cat', description: 'test' },
  { id: 4, uri: 'cat2', species: 'cat', description: 'test' },
  { id: 5, uri: 'duck1', species: 'duck', description: 'test' },
  { id: 6, uri: 'duck2', species: 'duck', description: 'test' },
];

jest.mock('../data/imageData', () => ({
  getImageData: () => mockData,
}));

describe('ImageController', () => {
  let controller: ImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [ImageService],
    }).compile();

    controller = module.get<ImageController>(ImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRandom', () => {
    it('should return an array', async () => {
      const result = await controller.getRandom({});

      expect(result).toBeInstanceOf(Array);
    });

    it('should return a default length of 5', async () => {
      const result = await controller.getRandom({});

      expect(result.length).toBe(5);
    });

    it('when passed a count, should return an array of correct length', async () => {
      const count = 2;
      const result = await controller.getRandom({ count });

      expect(result.length).toBe(count);
    });

    it('when passed a species, should return an array with images only of that type', async () => {
      const count = 2;
      const species = SPECIES.DOG;
      const mockDogData = mockData.filter(
        (mockImage) => mockImage.species === SPECIES.DOG,
      );

      const result = await controller.getRandom({ count, species });

      expect(result).toEqual(mockDogData);
    });
  });
});
