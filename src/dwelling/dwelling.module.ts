import { Module } from '@nestjs/common';
import { DwellingController } from './dwelling.controller';
import { DwellingService } from './dwelling.service';

@Module({
  controllers: [DwellingController],
  providers: [DwellingService]
})
export class DwellingModule {}
