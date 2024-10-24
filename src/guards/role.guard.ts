import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";

@Injectable()
export class RoleGuard implements CanActivate
{
    constructor(
        private readonly reflector: Reflector
    ){}

    async canActivate(context: ExecutionContext){

        const requerideRolers = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requerideRolers)
        {
            return true;
        }        
        const {usuario} = context.switchToHttp().getRequest()

        const rolesFilted = requerideRolers.filter(role => role === usuario.role)
        return rolesFilted.length > 0
    }
}