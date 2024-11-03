import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const clientURL = configService.get<string>('CLIENT_URL')

  app.enableCors({
    origin: clientURL,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
  await app.listen(configService.get<number>('PORT') ?? 5000)
}
bootstrap()
