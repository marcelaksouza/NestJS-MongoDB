import 'dotenv/config'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { UserModule } from './user/user.module'
import { MongooseModule } from '@nestjs/mongoose'

import { LoggerMiddleware } from './utils/logger.middleware'

const URL =
  'mongodb+srv://' +
  process.env.DATABASE_USER +
  ':' +
  process.env.DATABASE_PASS +
  '@' +
  process.env.DATABASE_HOST +
  '/' +
  process.env.DATABASE_NAME +
  '?retryWrites=true&w=majority'

@Module({
  imports: [
    // feature module
    UserModule,

    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60, limit: 10 }]),
    MongooseModule.forRoot(URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
