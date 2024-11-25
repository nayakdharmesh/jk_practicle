import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    UseGuards,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { DocumentService } from './document.service';
  import { CreateDocumentDto } from './dto/create-document.dto';
  import { UpdateDocumentDto } from './dto/update-document.dto';
  import { Document } from './entities/document.entity';
  
  @Controller('documents')
  export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}
  
    @Post()
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: '../../uploads', 
          filename: (req, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`;
            cb(null, filename);
          },
        }),
      }),
    )
    create(
      @Body() createDocumentDto: CreateDocumentDto,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<Document> {
      return this.documentService.create(createDocumentDto, file.path);
    }
  
    @Get()
    findAll(): Promise<Document[]> {
      return this.documentService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Document> {
      return this.documentService.findOne(+id);
    }
  
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateDocumentDto: UpdateDocumentDto,
    ): Promise<Document> {
      return this.documentService.update(+id, updateDocumentDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.documentService.remove(+id);
    }
  }
  