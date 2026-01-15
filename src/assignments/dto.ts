import { IsNumber, IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateAssignmentDto {
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @IsNotEmpty()
  @IsDate()
  endTime: Date;

  @IsString()
  @IsNotEmpty()
  location: string;
}
