import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shift } from './models/shiftModel';
import { CreateShiftDto, UpdateShiftDto } from './dto';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectModel(Shift)
    private shiftModel: typeof Shift,
  ) {}

  async findAllShifts(): Promise<Shift[]> {
    const allShifts = await this.shiftModel.findAll();
    return allShifts;
  }

  async findOneShiftById(shiftId: number): Promise<Shift | null> {
    const foundShift = await this.shiftModel.findOne({
      where: {
        id: shiftId,
      },
    });
    return foundShift;
  }

  async createOneShift(shiftData: CreateShiftDto): Promise<Shift> {
    const newShift = await this.shiftModel.create(shiftData as any);
    return newShift;
  }

  async updateOneShift(
    shiftId: number,
    shiftData: UpdateShiftDto,
  ): Promise<Shift | null> {
    const shiftToUpdate = await this.shiftModel.findOne({
      where: { id: shiftId },
    });

    const shiftWasNotFound = !shiftToUpdate;
    if (shiftWasNotFound) {
      return null;
    }

    const updatedShift = await shiftToUpdate.update(shiftData);
    return updatedShift;
  }

  async deleteOneShift(shiftId: number): Promise<boolean> {
    const numberOfDeletedRows = await this.shiftModel.destroy({
      where: { id: shiftId },
    });

    const shiftWasDeleted = numberOfDeletedRows > 0;
    return shiftWasDeleted;
  }
}
