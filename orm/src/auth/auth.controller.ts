import { AuthService } from './auth.service';
import { Controller, Post, Req, Body } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/register')
    async register(@Req() req: Request, @Body() userDTO: UserDTO):Promise<any> {
        return await this.authService.registerUser(userDTO);
    }
}
