import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Patch,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  UsePipes,
  ValidationPipe,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create_user.dto';
import { UpdatePutUserDTO } from './dto/create_put.dto';
import { UpdatePatchUserDTO } from './dto/create_patch.dto';
import { UserService } from './user.service';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { ParamId } from '../decorators/param_id.decorator';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Public } from '../decorators/public.decorator';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Public()
  @Post('register')
  async create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }

  @Roles(Role.Admin)
  @Get()
  async list() {
    return this.usersService.list();
  }

  @Get(':id')
  async show(@ParamId() idusuarios: number) {
    return this.usersService.show(idusuarios);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() idusuarios: number) {
    return this.usersService.update(idusuarios, data);
  }

  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchUserDTO,
    @ParamId() idusuarios: number,
  ) {
    return this.usersService.updatePartial(idusuarios, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.usersService.delete(id);
  }
}
