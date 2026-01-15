import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './models/itemModel';

@Module({
  imports:[SequelizeModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService, SequelizeModule]
})
export class ItemsModule {}
