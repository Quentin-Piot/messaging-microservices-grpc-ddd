import { Controller, Post, Body, Inject, UseInterceptors } from "@nestjs/common";
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateUserDto
} from "@quentinpiot/dtos"
import { GrpcToHttpInterceptor } from "../interceptors/grpc-to-http.interceptor";

interface UserService {
  createUser(data: { email: string; password: string; phoneNumber: string }): Observable<{ id: string; email: string }>;
}

@UseInterceptors(GrpcToHttpInterceptor)
@Controller('users')
export class UserController {
  private userService: UserService;


  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    try {
      this.userService = this.client.getService<UserService>('UserService')

    }catch (error) {
      console.log(error)
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
