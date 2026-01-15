import { FileInterceptor } from '@nestjs/platform-express';
import { DtoItem } from './dto';
import { ItemsService } from './items.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @HttpCode(HttpStatus.OK)
  @Post('transactions/purchse')
  async createItem(@Body() signInDto: DtoItem) {
    return await this.itemService.createOne(signInDto);
  }

  @Post('images/check/:itemId')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
