import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto, filePath: string): Promise<Document> {
    const document = this.documentRepository.create({ ...createDocumentDto, filePath });
    return this.documentRepository.save(document);
  }

  async findAll(): Promise<Document[]> {
    return this.documentRepository.find();
  }

  async findOne(id: number): Promise<Document> {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto): Promise<Document> {
    await this.documentRepository.update(id, updateDocumentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.documentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
  }
}
