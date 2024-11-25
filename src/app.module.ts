import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity'
import { Document } from './document/entities/document.entity';
import { DocumentModule } from './document/document.module';
import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'jk_practicle',
      entities: [User, Document],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    DocumentModule,
    IngestionModule
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule { }
