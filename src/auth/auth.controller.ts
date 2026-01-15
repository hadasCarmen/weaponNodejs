
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { RolesGuard } from 'src/roles/role.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { DtoUser } from 'src/users/dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: DtoUser) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
    
    @Roles(Role.Commander)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register (@Body() signInDto:DtoUser) {
        return this.authService.create(signInDto);
    }

    @Roles(Role.Commander)
    @UseGuards(AuthGuard, RolesGuard)
    @Get('profile')
    getProfile(@Request() req : any) {
        return req.user;
    }
}
