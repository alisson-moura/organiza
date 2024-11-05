import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaListCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row justify-center">
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="background-02.svg"
          alt="Login image"
          width={800}
          height={800}
          className="h-full w-full object-scale-down"
        />
      </div>
      <div className="flex w-full items-center justify-center p-4 lg:w-1/2">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
            <FaListCheck size={64}/>
            </div>
            <h2 className="text-3xl font-bold">Organiza</h2>
            <p className="text-sm text-muted-foreground">
              Cadastre-se na nossa plataforma para organizar seus grupos e listas
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
          <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="ex: João da Silva"
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="ex: acme@exemplo.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" placeholder="ex: Random@1234" required type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">Cadastrar</Button>
            <div className="text-sm text-center space-x-4">
              <Link className="text-primary hover:underline" to="/">
                Voltar para o Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
