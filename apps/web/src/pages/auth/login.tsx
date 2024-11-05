import { z } from "zod";
import { RxReload } from "react-icons/rx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuthControllerLogin } from "@/api/endpoints/auth/auth";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." })
    .max(140, { message: "A senha deve ter no máximo 140 caracteres." }),
});

export function LoginPage() {
  const { setToken } = useAuth();
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
      const response = await authRequest.mutateAsync({
        data: values,
      });
      setToken(response.data.accessToken);
      navigate("/", { replace: true });
    } catch {
      toast({
        title: "Algo deu errado!",
        description: "E-mail ou senha estão incorretos",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col ">
      <p className="text-sm text-muted-foreground mb-4 text-center">
        Digite seu e-mail e senha para realizar o login
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            {authRequest.isPending ? (
              <RxReload className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
      <div className="space-x-4 mt-4 flex justify-between">
        <Link className="text-primary hover:underline" to="/forgot-password">
          Esqueceu sua senha?
        </Link>
        <Link className="text-primary hover:underline" to="/auth/sign-up">
          Cadastrar-se
        </Link>
      </div>
    </div>
  );
}
