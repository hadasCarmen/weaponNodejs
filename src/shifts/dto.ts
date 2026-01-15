import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';

export class CreateShiftDto {
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

export class UpdateShiftDto {
  @IsOptional()
  @IsDate()
  startTime?: Date;

  @IsOptional()
  @IsDate()
  endTime?: Date;

  @IsString()
  @IsOptional()
  location?: string;
}
