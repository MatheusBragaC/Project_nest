import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { CreateUserDTO } from './create_user.dto';

export class UpdatePutUserDTO extends CreateUserDTO {}
