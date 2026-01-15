import { DtoItem } from './dto';
import { ItemsService } from './items.service';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request
} from '@nestjs/common';

@Controller('items')
export class ItemsController {
  constructor (
    private itemService : ItemsService
  ){}

 @HttpCode(HttpStatus.OK)
    @Post('transactions/purchse')
    async createItem(@Body() signInDto: DtoItem) {
        return await this.itemService.createOne(signInDto);
    }
    

  // @Get()
  // async getAll() {
  //   return await this.itemService.findAll()
  // }
  @Get()
  async findOne(name:string) {
    return await this.itemService.findOne(name)
  }
}
