import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import Logging from 'library/Logging'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    Logging.info(
      `Incoming -> Method [${req.method}] - Url: [${req.originalUrl}] -Host: [${req.hostname}] -IP: [${req.socket.remoteAddress}]`,
    )

    if (next) {
      next()
    }
  }
}
