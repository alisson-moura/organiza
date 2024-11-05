import { z } from "zod";
import { RxReload } from "react-icons/rx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaListCheck } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuthControllerLogin } from "@/api/endpoints/auth/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." })
    .max(140, { message: "A senha deve ter no máximo 140 caracteres." }),
});

export function LoginPage() {
  const navigate = useNavigate();
  const authRequest = useAuthControllerLogin();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await authRequest.mutateAsync({
        data: values,
      });
      navigate("/app");
    } catch  {
      toast({
        title: "Algo deu errado!",
        description: "E-mail ou senha estão incorretos",
        variant: "destructive",
      });
    }
  }

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
              Digite seu e-mail e senha para realizar o login
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: me@exemplo.com"
                          required
                          type="email"
                          {...field}
                        />
                      </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={authRequest.isPending} className="w-full">
                  {authRequest.isPending ? <RxReload className="mr-2 h-4 w-4 animate-spin"/>: 'Login'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
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
