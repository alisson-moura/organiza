import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private database: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const emailInUse = await this.database.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (emailInUse != null) {
      throw new BadRequestException(
        'Este e-mail já está em uso por outro usuário.',
      );
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    await this.database.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.database.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id },
    });
    if (user == null) {
      throw new NotFoundException('Não encontramos nenhum perfil com este id.');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.email != null && user.email != updateUserDto.email) {
      const emailInUse = await this.database.user.findUnique({
        where: { email: updateUserDto.email },
      });
      if (emailInUse != null) {
        throw new BadRequestException(
          'Este e-mail já está em uso por outro usuário.',
        );
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    await this.database.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.database.user.delete({ where: { id } });
  }
}
