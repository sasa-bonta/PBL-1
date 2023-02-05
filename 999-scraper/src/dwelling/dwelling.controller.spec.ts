import { Test, TestingModule } from '@nestjs/testing';
import { DwellingController } from './dwelling.controller';

describe('DwellingController', () => {
  let controller: DwellingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DwellingController],
    }).compile();

    controller = module.get<DwellingController>(DwellingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
