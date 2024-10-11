import { CatsService } from './cats.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Cat } from '../entities/cat.entity';
import { CreateCatDto } from './dto/create-cat-dto';
import { UpdateCatDto } from './dto/update-cat-dto';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService:CatsService) {}
    
    @Get()
    findAll() {
        return this.catsService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: string){
        return this.catsService.findOne(id);
    }

    @Post()
    create(@Body() cat:CreateCatDto) {
        this.catsService.create(cat);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        this.catsService.remove(id);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() cat:UpdateCatDto) {
        return this.catsService.update(id, cat);
    }

}
