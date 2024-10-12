import { CatsService } from './cats.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat-dto';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService){}

    @Get()
    findAll():Promise<Cat[]> {
        return this.catsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: number):Promise<Cat> {
        return this.catsService.findOne(id);
    }

    @Post()
    create(@Body() cat:Cat) {
        return this.catsService.create(cat);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.catsService.remove(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() cat:Cat) {
        return this.catsService.update(id, cat)
    }


}
