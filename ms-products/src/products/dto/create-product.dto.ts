
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 64)
  sku!: string;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsString()
  @IsNotEmpty()
  @Length(2, 6)
  currency!: string; 

  @IsString()
  @IsNotEmpty()
  companyId!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
