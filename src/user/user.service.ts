import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create_user.dto";
import { PrimaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/creat_put.dto";
import { UpdatePatchUserDTO } from "./dto/create_patch.dto";
import { NotFoundError } from "rxjs";

@Injectable()
export class UserService
{
    constructor(private readonly prisma: PrimaService){}

    async create(data: CreateUserDTO)
    {
       return this.prisma.usuario.create({
            data
             });

    }

    async list()
    {
        return this.prisma.usuario.findMany();
    }

    async show(idusuarios: number) 
    {
        await this.exists(idusuarios)


        return this.prisma.usuario.findUnique({
            where: {
                idusuarios,
            }
        })
    }

    async update(idusuarios: number, {email, name, password, birthAt}: UpdatePutUserDTO)
    {

        await this.exists(idusuarios)
    

        if (!birthAt)
        {
            birthAt = null;
        }
        return this.prisma.usuario.update({
            data: {email, name, password, birthAt: birthAt? new Date(birthAt) : null},

            where: {
                idusuarios
            },
        })
    }
    async updatePartial(idusuarios: number, {email, name, password, birthAt}: UpdatePatchUserDTO)
    {

        await this.exists(idusuarios)
    

        const data: any = {}

        if (birthAt)
        {
            data.birthAt = new Date(birthAt);
        }
        if (email)
        {
            data.email = email;
        }
        if (name)
        {
            data.name = name;
        }
        if (password)
        {
            data.password = password;
        }

        

        return this.prisma.usuario.update({
            data: {email, name, password, birthAt},
            where: {
                idusuarios: 1,
            },
        })
    }


    async delete(idusuarios: number)
    {

        await this.exists(idusuarios)

        return this.prisma.usuario.delete({
            where:{
                idusuarios
            }
        })
    }

    async exists(idusuarios: number)
    {
        if (!(await this.prisma.usuario.count({
            where: {
                idusuarios,
            }
        })))
            {
                throw new NotFoundException(`O usuário ${idusuarios}, não existe`);
            }
    }

}