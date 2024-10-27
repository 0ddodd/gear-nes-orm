import { AuthService } from './auth.service';
import { Controller, Post, Req, Body, Res } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/register')
    async register(@Req() req: Request, @Body() userDTO: UserDTO):Promise<any> {
        return await this.authService.registerUser(userDTO);
    }

    @Post('/login')
    async login(@Body() userDTO:UserDTO, @Res() res:Response):Promise<any> {
        const jwt = await this.authService.validateUser(userDTO);
        res.setHeader('Authroziation', 'Bearer '+jwt.accessToken);
        return res.json(jwt);
    }
}
