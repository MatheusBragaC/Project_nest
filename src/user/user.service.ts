import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create_user.dto';
import { PrimaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/create_put.dto';
import { UpdatePatchUserDTO } from './dto/create_patch.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrimaService) {}

  async create(data: CreateUserDTO) {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    return this.prisma.usuario.create({
      data,
    });
  }

  async list() {
    return this.prisma.usuario.findMany();
  }

  async show(idusuarios: number) {
    await this.exists(idusuarios);
    return this.prisma.usuario.findUnique({
      where: {
        idusuarios: idusuarios,
      },
    });
  }

  async update(
    idusuarios: number,
    { email, name, password, birthAt, role }: UpdatePutUserDTO,
  ) {
    await this.exists(idusuarios);
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    if (!birthAt) {
      birthAt = null;
    }
    return this.prisma.usuario.update({
      data: { email, name, password, role },

      where: {
        idusuarios,
      },
    });
  }
  async updatePartial(
    idusuarios: number,
    { email, name, password, birthAt, role }: UpdatePatchUserDTO,
  ) {
    await this.exists(idusuarios);
    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }
    if (email) {
      data.email = email;
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }
    if (role) {
      data.role = role;
    }
    return this.prisma.usuario.update({
      data: { email, name, password, role },
      where: {
        idusuarios,
      },
    });
  }

  async delete(idusuarios: number) {
    await this.exists(idusuarios);

    return this.prisma.usuario.delete({
      where: {
        idusuarios,
      },
    });
  }

  async exists(idusuarios: number) {
    if (
      !(await this.prisma.usuario.count({
        where: {
          idusuarios,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${idusuarios}, não existe`);
    }
  }
}
