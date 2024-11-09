import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateUserDto
} from "@quentinpiot/dtos"

interface UserService {
  createUser(data: { email: string; password: string; phoneNumber: string }): Observable<{ id: string; email: string }>;
}

@Controller('users')
export class UserController {
  private userService: UserService;


  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
