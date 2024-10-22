import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Trim } from '../../../../../core/decorators/transform/trim';
import { UserExists } from '../../../../../core/decorators/async/user-is-exist.decorator';

export class LoginDto {
  @Trim()
  @IsString({message: 'Должно быть строковым значением'})
  @Length(3, 10, {message: 'Количество знаков: 3-10'})
  loginOrEmail: string;

  @Trim()
  @IsString({message: 'Должно быть строковым значением'})
  @Length(6, 20, {message: 'Количество знаков: 6-20'})
  password: string;
}

export class EmailActivateDto {
  // @IsNotEmpty({message: 'Не может быть пустым'})
  @IsString({message: 'Должно быть строковым значением'})
  @Trim()
  @Length(3, 100, {message: 'Количество знаков: 3-100'})
  code: string;
}

export class ResendActivateCodeDto {
  @IsEmail({}, {message: 'Е-майл должен быть валидным'})
  email: string
}

export class PasswordRecoveryDto {
  @Trim()
  email: string
}
