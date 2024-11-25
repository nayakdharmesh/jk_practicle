import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class IngestionService {
  private ingestionProcesses = new Map<string, string>(); 

  constructor(private readonly httpService: HttpService) {}

  async triggerIngestion(ingestionId: string, dataUrl: string): Promise<string> {
    const webhookUrl = 'http://python-abc.in/ingest'; 
    const response = await lastValueFrom(
      this.httpService.post(webhookUrl, { ingestionId, dataUrl }),
    );
    // Store ingestion status
    this.ingestionProcesses.set(ingestionId, 'In Progress');
    return response.data.message || 'Ingestion triggered successfully.';
  }

  getIngestionStatus(ingestionId: string): string {
    return this.ingestionProcesses.get(ingestionId) || 'Unknown';
  }

  updateIngestionStatus(ingestionId: string, status: string): void {
    this.ingestionProcesses.set(ingestionId, status);
  }
}
