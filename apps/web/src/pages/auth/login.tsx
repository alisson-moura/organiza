import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="https://picsum.photos/800"
          alt="Login image"
          width={800}
          height={800}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-center p-4 lg:w-1/2">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <img
                src="https://picsum.photos/64"
                alt="Organiza logo"
                width={64}
                height={64}
              />
            </div>
            <h2 className="text-3xl font-bold">Organiza</h2>
            <p className="text-sm text-muted-foreground">
              Digite seu e-mail e senha para realizar o login
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" required type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">Login</Button>
            <div className="text-sm text-center space-x-4">
              <Link
                className="text-primary hover:underline"
                to="/forgot-password"
              >
                Esqueceu sua senha?
              </Link>
              <Link className="text-primary hover:underline" to="/sign-up">
                Cadastrar-se
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
