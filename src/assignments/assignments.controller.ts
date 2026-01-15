import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/role.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('assignments')
export class AssignmentsController {
  constructor(private assignmentsService: AssignmentsService) {}

  @Roles(Role.Commander)
  @Get()
  async getAllAssignments() {
    const allAssignments = await this.assignmentsService.findAllAssignments();
    return allAssignments;
  }

  @Get(':userId')
  async getOneAssignment(@Param('userId') userId: string) {
    const userIdAsNumber = parseInt(userId);
    const foundAssignment =
      await this.assignmentsService.findAssignmentByUserId(userIdAsNumber);

    const assignmentWasNotFound = !foundAssignment;
    if (assignmentWasNotFound) {
      throw new NotFoundException('Assignment not found');
    }

    return foundAssignment;
  }

  @Roles(Role.Commander)
  @Post()
  async createAssignment(@Body() assignmentData: CreateAssignmentDto) {
    const newAssignment =
      await this.assignmentsService.createOneAssignment(assignmentData);
    return newAssignment;
  }

  @Roles(Role.Commander)
  @Delete(':id')
  async deleteAssignment(@Param('id') assignmentId: string) {
    const assignmentIdAsNumber = parseInt(assignmentId);
    const assignmentWasDeleted =
      await this.assignmentsService.deleteOneAssignment(assignmentIdAsNumber);

    const assignmentWasNotFound = !assignmentWasDeleted;
    if (assignmentWasNotFound) {
      throw new NotFoundException('Assignment not found');
    }

    return { message: 'Assignment deleted successfully', deleted: true };
  }
}
