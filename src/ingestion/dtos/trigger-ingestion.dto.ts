import { IsString, IsNotEmpty } from 'class-validator';

export class TriggerIngestionDto {
  @IsString()
  @IsNotEmpty()
  ingestionId: string;

  @IsString()
  @IsNotEmpty()
  dataUrl: string; 
}
