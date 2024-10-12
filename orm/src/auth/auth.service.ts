import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    async registerUser(newUser: UserDTO):Promise<UserDTO> {
        let userFind: UserDTO = await this.userService.findByFields(
            {where: {username: newUser.username}}
        );
        if(userFind) {
            throw new HttpException('Username already used.', HttpStatus.BAD_REQUEST);
        }
        return await this.userService.save(newUser);
    }
}
