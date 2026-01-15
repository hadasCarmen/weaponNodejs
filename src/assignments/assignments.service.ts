import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Assignment } from './models/assignmentModel';
import { CreateAssignmentDto } from './dto';
import { ShiftsService } from 'src/shifts/shifts.service';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment)
    private assignmentModel: typeof Assignment,
    private shiftsService: ShiftsService,
  ) {}

  async findAllAssignments(): Promise<Assignment[]> {
    const allAssignments = await this.assignmentModel.findAll();
    return allAssignments;
  }

  async findAssignmentByUserId(userId: number): Promise<Assignment[]> {
    const foundAssignment = await this.assignmentModel.findAll({
      where: { userId: userId },
    });
    return foundAssignment;
  }

  async createOneAssignment(
    assignmentData: CreateAssignmentDto,
  ): Promise<Assignment> {
    const shift = await this.shiftsService.createOneShift({
      startTime: assignmentData.startTime,
      endTime: assignmentData.endTime,
      location: assignmentData.location,
    });
    const newAssignment = await this.assignmentModel.create({
      userId: assignmentData.userId,
      shiftId: shift.id,
    });
    return newAssignment;
  }

  async deleteOneAssignment(assignmentId: number): Promise<boolean> {
    const numberOfDeletedRows = await this.assignmentModel.destroy({
      where: { id: assignmentId },
    });

    const assignmentWasDeleted = numberOfDeletedRows > 0;
    return assignmentWasDeleted;
  }
}
