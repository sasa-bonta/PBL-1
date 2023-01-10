import { Test, TestingModule } from '@nestjs/testing';
import { DwellingService } from './dwelling.service';

describe('DwellingService', () => {
  let service: DwellingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DwellingService],
    }).compile();

    service = module.get<DwellingService>(DwellingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
