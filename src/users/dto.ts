import { IsString, IsInt, isString, IsNumber, IsEmail, IsBoolean, IsPositive, Min, IsOptional } from 'class-validator';

export class DtoItem {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @Min(0)
  @IsPositive()
  @IsNumber()
  quantity: number;

  @IsNumber()
  pricePerUnit: number;
  @IsBoolean()
  @IsOptional()
  hasImage: boolean;
}
