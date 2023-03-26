import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from './image.controller';
import { SPECIES } from './image.dto';
import { ImageService } from './image.service';

describe('ImageController', () => {
  let controller: ImageController;
  let service: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [ImageService],
    }).compile();

    controller = module.get<ImageController>(ImageController);
    service = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRandom', () => {
    const mockData = [
      { id: 1, uri: 'dog1', species: 'dog', description: 'test' },
      { id: 2, uri: 'dog2', species: 'dog', description: 'test' },
    ];

    let getRandomServiceMock: jest.SpyInstance;

    beforeEach(() => {
      getRandomServiceMock = jest
        .spyOn(service, 'getRandom')
        .mockImplementation(() => mockData);
    });

    afterEach(() => {
      getRandomServiceMock.mockRestore();
    });

    it('should return result from service call', async () => {
      const result = await controller.getRandom({});

      expect(getRandomServiceMock).toHaveBeenCalled();

      expect(result).toEqual(mockData);
    });

    it('should pass query to service', async () => {
      const count = 10;
      const species = SPECIES.DUCK;

      await controller.getRandom({ count, species });

      expect(getRandomServiceMock).toHaveBeenCalledWith({ count, species });
    });
  });
});
