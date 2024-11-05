import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional, IsUrl } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsUrl()
  @ApiProperty({
    required: false,
    description: "A url do avatar ou imagem do grupo",
  })
  avatarUrl?: string;
}
