import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import cookieSession from 'cookie-session'
import hpp from 'hpp'
import helmet from 'helmet'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const keyOne = this.configService.get<string>('SECRET_KEY_ONE')
    const keyTwo = this.configService.get<string>('SECRET_KEY_TWO')
    const secure = this.configService.get<string>('NODE_ENV')

    cookieSession({
      name: 'session',
      keys: [keyOne, keyTwo],
      maxAge: 24 * 7 * 3600000,
      secure: secure !== 'development',
    })(req, res, () => {
      hpp()(req, res, () => {
        helmet()(req, res, next)
      })
    })
  }
}
