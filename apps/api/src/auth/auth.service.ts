import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { DatabaseService } from "src/database/database.service";
import { AuthEntity } from "./entity/auth.entity";

@Injectable()
export class AuthService {
  constructor(
    private database: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.database.user.findUnique({ where: { email } });

    if (!user) {
      throw new BadRequestException(`E-mail ou senha incorretos.`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException(`E-mail ou senha incorretos.`);
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
