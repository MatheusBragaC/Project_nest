import {Controller, Post, Body, Get, Put, Patch, Delete, UseInterceptors, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create_user.dto";
import { UpdatePutUserDTO } from "./dto/creat_put.dto";
import { UpdatePatchUserDTO } from "./dto/create_patch.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param_id.decorator";
import { Role } from "src/enums/role.enum";
import { Roles } from "src/decorators/role.decorator";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller("users")
export class UserController
{

    constructor(private readonly usersService: UserService){}

    @Post()
    async create(@Body() data: CreateUserDTO)
    {
        return this.usersService.create(data);
    }

   @Get()
   async list()
   {
    return this.usersService.list();
   }
    
    @Get(":id")
    async show(@ParamId() idusuarios: number)
    {
        console.log({idusuarios})
        return this.usersService.show(idusuarios);
    }
    
    @Put(":id")
    async update(@Body() data: UpdatePutUserDTO, @ParamId() idusuarios: number)
    {
        return this.usersService.update(idusuarios, data);

    }
    
    @Patch(":id")
    async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() idusuarios: number)
    {
            return this.usersService.updatePartial(idusuarios, data);

    }

    @Delete(":id")
    async delete(@ParamId() id: number)
    {
        return this.usersService.delete(id);
        
    }
}