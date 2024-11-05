import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({ description: "uuid" })
  id: string;

  @ApiProperty({
    description: "Seu nome",
    example: "João da Silva",
    type: "string",
  })
  name: string;

  @ApiProperty({
    description: "Seu e-mail",
    example: "acme@mail.com",
    type: "string",
  })
  email: string;

  @ApiProperty({
    required: false,
    description: "A url do avatar ou imagem do grupo",
  })
  avatarUrl?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
