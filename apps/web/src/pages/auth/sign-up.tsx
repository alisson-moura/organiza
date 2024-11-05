import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaListCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUsersControllerCreate } from "@/api/endpoints/perfil/perfil";
import { ToastAction } from "@/components/ui/toast";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." })
    .max(70, { message: "O nome deve ter no máximo 70 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." })
    .max(140, { message: "A senha deve ter no máximo 140 caracteres." }),
});

export function SignUpPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const signUpRequest = useUsersControllerCreate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    await signUpRequest.mutateAsync({
      data: values,
    });
    if (signUpRequest.isSuccess) {
      toast({
        title: "Conta criada com sucesso.",
        description: "Agora é só acessar e começar a organizar",
        action: <ToastAction onClick={() => {navigate('/')}}  altText={"Login"}>Ir para o Login</ToastAction>
      });
    } else {
      toast({
        title: "Algo deu errado!",
        description: "Não conseguimos criar sua conta no momento",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row justify-center">
      <div className="flex w-full items-center justify-center p-4 lg:w-1/2">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <FaListCheck size={64} />
            </div>
            <h2 className="text-3xl font-bold">Organiza</h2>
            <p className="text-sm text-muted-foreground">
              Cadastre-se na nossa plataforma para organizar seus grupos e
              listas
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(handleOnSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: João da Silva"
                          required
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Seu nome e sobrenome.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: joao@exemplo.com"
                          required
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        E-mail que deseja receber notificações.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          required
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Senha para acessar a plataforma.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full">Cadastrar</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
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
