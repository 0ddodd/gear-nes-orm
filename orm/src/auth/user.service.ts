import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import { User } from "./entity/user.entity";
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UserService {
    constructor(
        // @EntityRepository 기능 deprecate 이슈로 인해 그냥 직접 넣어줌
        // @InjectRepository(UserRepository)
        // private userRepository: UserRepository

        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async findByFields(options: FindOneOptions<UserDTO>): Promise<User | undefined> {
        return await this.userRepository.findOne(options);
    }

    async save(userDTO: UserDTO):Promise<UserDTO | undefined> {
        await this.transformPassword(userDTO);
        console.log(userDTO);
        return await this.userRepository.save(userDTO);
    }
    
    async transformPassword(user: UserDTO):Promise<void>{
        user.password = await bcrypt.hash(
            user.password, 10
        );
        return Promise.resolve();
    }
}