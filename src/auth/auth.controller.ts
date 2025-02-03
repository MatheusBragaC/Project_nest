import { BadRequestException, Body, Controller, FileTypeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth.login.dto";
import { AuthRegisterDTO } from "./dto/auth.register.dto";
import { AuthForgetDTO } from "./dto/auth.forget.dto";
import { AuthResetDTO } from "./dto/auth.reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { RoleGuard } from "src/guards/role.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { FileService } from "src/file/file.service";
import { Public } from "src/decorators/public.decorator";

@Public()
@Controller("auth")
export class AuthController
{

    constructor(
        private readonly userService: UserService, 
        private readonly authService: AuthService,
        private readonly fileService: FileService
    ) {}
    

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO){
        return this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO){
        return this.authService.register(body)
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO) {
        return this.authService.forget(email)
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO) {
        return this.authService.reset(password, token)
    }


    @UseInterceptors(FileInterceptor("file"))
    @UseGuards(AuthGuard)
    @Post('photo')
    async photo(@User() usuario, @UploadedFile(new ParseFilePipe({
        validators: [
        ]
    })) photo) {

        const path = join(__dirname, "..", "..", "storage", "photos", `photo-${usuario.idusuarios}.png`)
        
        try{
            this.fileService.upload(photo, path);
            
        }catch(e)
        {
            throw new BadRequestException(e)
        }
        
        return {sucess: true}
    }
}