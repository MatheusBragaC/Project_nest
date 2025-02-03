import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'
import { Usuario } from "@prisma/client";
import { PrimaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth.register.dto";
import { UserService } from "src/user/user.service";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService
{
    private issuer = "login"
    private audicente = "users"

    constructor(
        private readonly jwtService: JwtService, 
        private readonly prisma: PrimaService,
        private readonly userService: UserService,
        private readonly mailer: MailerService
    ) {}

    createToken(user: Usuario)
    {
        return this.jwtService.sign({
            idusuarios: user.idusuarios,
            name: user.name,
            email: user.email
        }, {
            subject: String(user.idusuarios),
            issuer: this.issuer,
            expiresIn: "7 days",
            audience: this.audicente
        })
    }

    checkToken(token:string)
    {
        try {
        const data =  this.jwtService.verify(token, {
            audience: this.audicente,
            issuer: this.issuer,
        })
        return data;
        }catch (e){
            throw new BadRequestException(e);
        }
    }

    isValidToken( token: string)
    {
        try{
            this.checkToken(token)
            return true;
        } catch(e){
            return false;
        }
    }

    async login(email: string, password: string){
        const user = await this.prisma.usuario.findFirst({
            where: {
                email
            }
        })
        if (!user)
        {
            throw new UnauthorizedException("Email e/ou senha incorretos")
        }

        return this.createToken(user);
    }

    async forget(email: string){
        const user = await this.prisma.usuario.findFirst({
            where: {
                email
            }
        })
        if (!user)
        {
            throw new UnauthorizedException("Email está incorreto")
        }

        const token = this.jwtService.sign({
            id: user.idusuarios
        },{
            subject: String(user.idusuarios),
            issuer: "forget",
            expiresIn: "30 minutes",
            audience: this.audicente
        })
        await this.mailer.sendMail({
            subject: "Recuperação de senha",
            to: "joao@HttpCode.com.br",
            template: "forget",
            context: {
                name: "user.name",
                token: "http://localhost"
            }

        })

        return true;
    }

    async reset(password: string, token: string){
       
       try{
            const data = this.jwtService.verify(token, {
                issuer: "forget",
                audience: "users"
            })
            const idusuarios = 0;
        
        const user = await this.prisma.usuario.update({
            where: {
                idusuarios,
            },
            data: {
                password,
            }
        })
        return this.createToken(user);

       } catch(e){
        throw new BadRequestException(e)
       }

    }

    async register(data: AuthRegisterDTO)
    {
        const user = await this.userService.create(data);

        return this.createToken(user);
    }

}