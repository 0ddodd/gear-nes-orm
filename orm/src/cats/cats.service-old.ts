import { Injectable } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat-dto';
import { UpdateCatDto } from './dto/update-cat-dto';

@Injectable()
export class CatsService {
    private cats:Cat[] = [];

    findAll(): Cat[] {
        return this.cats;
    }

    findOne(id: string): Cat {
        return this.cats.find(cat => cat.id === +id);
    }

    create(cat: CreateCatDto) {
        this.cats.push({id: this.cats.length + 1, ...cat});
    }
    
    remove(id: string) {
        this.cats = this.cats.filter(cat => cat.id !== +id);
    }

    update(id: string, cat: UpdateCatDto) {
        const existCat = this.findOne(id); 
        if(id) {
            this.remove(id);
            this.cats.push({...existCat, ...cat});
        }
    }

}
