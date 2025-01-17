import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from 'src/cats/entities/cat.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cat])],
  exports:[TypeOrmModule],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
