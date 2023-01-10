import { Controller, Get, Query } from '@nestjs/common';
import { DwellingService } from './dwelling.service';
import dataset_v2 from './results/dataset_v2';

@Controller('dwelling')
export class DwellingController {
  constructor(readonly dwellingService: DwellingService) {}

  @Get()
  getAnnouncesUrls(@Query('nr') nr = 218) {
    return this.dwellingService.getAnnouncesLinks(nr);
  }

  @Get('/announce')
  getAnnounce(@Query('url') url) {
    return this.dwellingService.getAnnounce(url);
  }

  @Get('/dataset')
  getDataset(@Query('min') min, @Query('max') max) {
    return this.dwellingService.getDataset(Number(min), Number(max));
  }

  @Get('/no_duplicates')
  getNoDuplicates() {
    return this.dwellingService.filterDuplicates(dataset_v2);
  }
}
