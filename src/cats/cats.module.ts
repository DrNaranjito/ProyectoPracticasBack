import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Cat } from './entities/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from '../breed/entities/breed.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
  TypeOrmModule.forFeature([Cat, Breed]),
  HttpModule],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule { }
