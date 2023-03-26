import { Test, TestingModule } from '@nestjs/testing';
import { SPECIES } from './image.dto';
import { ImageMetadata } from './image.interface';
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

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageService],
    }).compile();

    service = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRandom', () => {
    it('should return result ', async () => {
      const result = await service.getRandom({});

      expect(result).toBeInstanceOf(Array);
    });

    it('should return a default length of 5', async () => {
      const result = await service.getRandom({});

      expect(result.length).toBe(5);
    });

    it('when passed a count, should return an array of correct length', async () => {
      const count = 2;
      const result = await service.getRandom({ count });

      expect(result.length).toBe(count);
    });

    it('when passed a species, should return an array with images only of that type', async () => {
      const count = 2;
      const species = SPECIES.DOG;

      const mockDogData = mockData.filter(
        (mockImage) => mockImage.species === SPECIES.DOG,
      );

      const result = await service.getRandom({ count, species });
      const sortedResult = result.sort((a, b) => (a.id > b.id ? 1 : -1));
      expect(sortedResult).toEqual(mockDogData);
    });
  });
});
