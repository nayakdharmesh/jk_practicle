import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { TriggerIngestionDto } from './dtos/trigger-ingestion.dto';

@Controller('ingestion')
export class IngestionController {
    constructor(private readonly ingestionService: IngestionService) { }

    @Post('trigger')
    async triggerIngestion(@Body() triggerIngestionDto: TriggerIngestionDto) {
        const { ingestionId, dataUrl } = triggerIngestionDto;
        const message = await this.ingestionService.triggerIngestion(ingestionId, dataUrl);
        return { message };
    }

    @Get('status/:id')
    getIngestionStatus(@Param('id') ingestionId: string) {
        const status = this.ingestionService.getIngestionStatus(ingestionId);
        return { ingestionId, status };
    }

    @Post('status/update')
    updateIngestionStatus(
        @Body('ingestionId') ingestionId: string,
        @Body('status') status: string,
    ) {
        this.ingestionService.updateIngestionStatus(ingestionId, status);
        return { message: 'Ingestion status updated successfully.' };
    }
}
