import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { UserModule } from './user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
@Module({
  imports: [
    // feature module
    UserModule,

    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ttl: 60, limit: 10}]),
    MongooseModule.forRoot(process.env.DATABASE_URI)
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
