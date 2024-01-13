import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateUserInput } from './model/user.input'
import { UserService } from './user.service'
import { UserPayload } from './model/user.payload'

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post()
  createUser(@Body() body: CreateUserInput): Promise<UserPayload> {
    return this.userService.createUser(body)
  }

  @Get('/list')
  listUser(): Promise<UserPayload[]> {
    return this.userService.listUser()
  }

  @Get('/:id')
  findUser(@Param('id') id: string): Promise<UserPayload> {
    return this.userService.findUser(id)
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: CreateUserInput): Promise<UserPayload> {
    return this.userService.updateUser(id, body)
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id)
  }
}
