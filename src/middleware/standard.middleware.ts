import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import compression from 'compression'
import * as bodyParser from 'body-parser'

@Injectable()
export class StandardMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    compression()(req, res, () => {
      bodyParser.json({ limit: '50mb' })(req, res, () => {
        bodyParser.urlencoded({ extended: true, limit: '50mb' })(req, res, next)
      })
    })
  }
}
