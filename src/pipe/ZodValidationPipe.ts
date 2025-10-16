import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema, z } from 'zod/v3';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata): any {
    try {
      return this.schema.parse(value);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('管道函数验证失败');
    }
  }
}

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreatCatDto = z.infer<typeof createCatSchema>;
