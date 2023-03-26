import { Test, TestingModule } from '@nestjs/testing';
import { STATUS_CODES } from 'http';
import { ImageController } from './image.controller';
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
    it('should return an array', async () => {
      const result = await controller.getRandom();

      expect(result).toBeInstanceOf(Array);
    });

    it('should return an array of correct length', async () => {
      const count = 2;
      const result = await controller.getRandom(null, count);

      expect(result.length).toBe(count);
    });
  });
});
