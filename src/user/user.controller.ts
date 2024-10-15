import {Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create_user.dto";
import { UpdatePutUserDTO } from "./dto/creat_put.dto";
import { UpdatePatchUserDTO } from "./dto/create_patch.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";

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
    async show(@Param("id", ParseIntPipe) idusuarios: number)
    {
        return this.usersService.show(idusuarios);
    }

    @Put(":id")
    async update(@Body() data: UpdatePutUserDTO, @Param("id", ParseIntPipe) idusuarios: number)
    {
        return this.usersService.update(idusuarios, data);

    }

    @Patch(":id")
    async updatePartial(@Body() data: UpdatePatchUserDTO, @Param("id", ParseIntPipe) idusuarios: number)
    {
            return this.usersService.updatePartial(idusuarios, data);

    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number)
    {
        return this.usersService.delete(id);
        
    }
}