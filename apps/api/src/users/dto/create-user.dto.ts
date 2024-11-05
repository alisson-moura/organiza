import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    description: "Seu nome",
    example: "João da Silva",
    type: "string",
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "Seu e-mail",
    example: "acme@mail.com",
    type: "string",
  })
  email: string;

  @IsStrongPassword()
  @ApiProperty({
    description: "Sua senha",
    example: "Random@1234",
    minLength: 6,
    type: "string",
  })
  password: string;
}
