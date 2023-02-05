import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DwellingModule } from './dwelling/dwelling.module';

@Module({
  imports: [DwellingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
