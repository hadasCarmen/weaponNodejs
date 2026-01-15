import { Injectable } from '@nestjs/common';
import { DtoItem } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './models/itemModel';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item)
    private itemModel: typeof Item,
  ) {}

  // async findAll(): Promise<Item[]> {
  //   return await this.itemModel.findAll();
  // }

  async findOne(name: string): Promise<Item | null> {
    const item = this.itemModel.findOne({
      where: {
        name,
      },
      raw: true,
    });
    return item;
  }

  async createOne(item: DtoItem): Promise<Item|null> {
    const item1 = await this.findOne(item.name);
    if (!item1) {
      return await this.itemModel.create(item as any);
    } else {
      await this.itemModel.update(
        { quantity: item1.quantity + item.quantity },
        { where: { name: item.name } },
      );
      return await this.findOne(item.name);
    }
  }
}
