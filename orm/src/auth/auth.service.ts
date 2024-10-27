import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
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

    async validateUser(userDTO: UserDTO):Promise<{accessToken: string} | undefined> {
        let userFind: User = await this.userService.findByFields({
            where: {username: userDTO.username}
        });
        const valudatePassword = await bcrypt.compare(userDTO.password, userFind.password);
        
        if(!userFind || !valudatePassword) {
            throw new UnauthorizedException();
        }
        const payload: Payload = {id: userFind.id, username: userFind.username}
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
