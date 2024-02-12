import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// @Catch(HttpException)
@Catch() // dejar esto en blanco para atrapar todas las exceptions
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('FILTER');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response.status(status).json({
      statusCode: 500,
      timestamp: new Date().toISOString() + 'HOLAA',
      path: request.url,
    });
  }
}
// use(req: Request, res: Response, next: NextFunction) {
//     console.log('Request...');
//     console.log('*** MANEJADOR DE ERROR EN MIDDLEWARE ***');
//     if (!errorHandler.isTrustedError(error)) {
//       console.log('*** NOT TRUSTED ERROR ***');
//       next(error);
//     }
//     console.log('*** TRUSTED ERROR ***');
//     // await errorHandler.handleError(error);
//     next();
//   }
