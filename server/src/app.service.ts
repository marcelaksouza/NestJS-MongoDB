import { Injectable, Logger } from '@nestjs/common'
import { RequestService } from './middleware/request.service'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  constructor(private readonly requestService: RequestService) {}

  getHello(): string {
    const userId = this.requestService.getUserId()
    this.logger.log('getHello userID', userId)
    return 'Hello World!'
  }
}
