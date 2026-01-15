// import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ItemsService } from './users/items.service';

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
// import { AuthGuard } from './auth.guard';
// import { AuthService } from './auth.service';
// import { Public } from './public.decorator';
import { RolesGuard } from 'src/roles/role.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { DtoItem } from 'src/users/dto';
@Controller('auth')
export class ItemController {
    constructor(private itemService: ItemsService) { }
    
   
    @HttpCode(HttpStatus.OK)
    @Post('buyOne')
    signIn(@Body() signInDto: DtoItem) {
        return this.itemService.createOne(signInDto);
    }
    
    // @Roles(Role.Commander)
    // @UseGuards(AuthGuard, RolesGuard)
    // @HttpCode(HttpStatus.CREATED)
    // @Post('register')
    // register (@Body() signInDto:DtoUser) {
    //     return this.authService.create(signInDto);
    // }

    // @Roles(Role.Commander)
    // @UseGuards(AuthGuard, RolesGuard)
    @Get('one')
    getOne(@Request() req : any) {
        return req.item;
    }
}

