import { Module } from '@nestjs/common';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shift } from './models/shiftModel';

@Module({
  imports: [SequelizeModule.forFeature([Shift])],
  controllers: [ShiftsController],
  providers: [ShiftsService],
  exports: [ShiftsService, SequelizeModule],
})
export class ShiftsModule {}
