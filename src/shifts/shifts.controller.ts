import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto, UpdateShiftDto } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/role.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('shifts')
export class ShiftsController {
  constructor(private shiftsService: ShiftsService) {}

  @Roles(Role.Commander)
  @Get()
  async getAllShifts() {
    const allShifts = await this.shiftsService.findAllShifts();
    return allShifts;
  }

  @Get(':id')
  async getOneShift(@Param('id') shiftId: string) {
    const shiftIdAsNumber = parseInt(shiftId);
    const foundShift =
      await this.shiftsService.findOneShiftById(shiftIdAsNumber);

    const shiftWasNotFound = !foundShift;
    if (shiftWasNotFound) {
      throw new NotFoundException('Shift not found');
    }

    return foundShift;
  }

  @Roles(Role.Commander)
  @Post()
  async createShift(@Body() shiftData: CreateShiftDto) {
    const newShift = await this.shiftsService.createOneShift(shiftData);
    return newShift;
  }

  @Roles(Role.Commander)
  @Put(':id')
  async updateShift(
    @Param('id') shiftId: string,
    @Body() shiftData: UpdateShiftDto,
  ) {
    const shiftIdAsNumber = parseInt(shiftId);
    const updatedShift = await this.shiftsService.updateOneShift(
      shiftIdAsNumber,
      shiftData,
    );

    const shiftWasNotFound = !updatedShift;
    if (shiftWasNotFound) {
      throw new NotFoundException('Shift not found');
    }

    return updatedShift;
  }

  @Roles(Role.Commander)
  @Delete(':id')
  async deleteShift(@Param('id') shiftId: string) {
    const shiftIdAsNumber = parseInt(shiftId);
    const shiftWasDeleted =
      await this.shiftsService.deleteOneShift(shiftIdAsNumber);

    const shiftWasNotFound = !shiftWasDeleted;
    if (shiftWasNotFound) {
      throw new NotFoundException('Shift not found');
    }

    return { message: 'Shift deleted successfully', deleted: true };
  }
}
