import { Module } from '@nestjs/common';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Assignment } from './models/assignmentModel';
import { UsersModule } from 'src/users/users.module';
import { ShiftsModule } from 'src/shifts/shifts.module';
@Module({
  imports: [
    SequelizeModule.forFeature([Assignment]),
    UsersModule,
    ShiftsModule,
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  exports: [AssignmentsService, SequelizeModule],
})
export class AssignmentsModule {}
