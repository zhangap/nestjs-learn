import { Request, Response, NextFunction } from 'express';

// 函数式中间件
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('中间件被执行....');
  console.log(req.params.id);
  next();
}
