import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const User = createParamDecorator((filter: string, context: ExecutionContext) =>
{
    const request = context.switchToHttp().getRequest();

    if (request.usuario)
    {
        return request.usuario

    } else{
        throw new NotFoundException("Usuário não encontrado no Request. Use o AuthGuard para obter o usuário")
    }
    
    

}

)