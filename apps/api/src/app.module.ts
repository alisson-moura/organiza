import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { env, validate } from "./env";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [env], validate }),
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
