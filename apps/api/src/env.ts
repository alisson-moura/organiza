import { plainToInstance } from "class-transformer";
import {
  IsString,
  IsEnum,
  IsNumber,
  Max,
  Min,
  validateSync,
  Matches,
} from "class-validator";

export const env = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.EXPIRES_IN,
  },
});

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @Matches(/^(postgresql):\/\/.+$/)
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  EXPIRES_IN: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
