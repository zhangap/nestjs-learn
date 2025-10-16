//基于类验证器的DTO写法
import { IsNumber, IsString } from 'class-validator';

export class ClassValidateCatDto {
  @IsString()
  name: string;
  @IsNumber()
  age: number;
  @IsString()
  breed: string;
}
