import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';

@Module({
  imports: [HttpModule], 
  controllers: [IngestionController],
  providers: [IngestionService],
})
export class IngestionModule {}
