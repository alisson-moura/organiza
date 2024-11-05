import { z } from "zod";
import { RxReload } from "react-icons/rx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
    try {
      await signUpRequest.mutateAsync({
        data: values,
      });
      toast({
        title: "Conta criada com sucesso.",
        description: "Agora é só acessar e começar a organizar",
        action: (
          <ToastAction
            onClick={() => {
              navigate("/");
            }}
            altText={"Login"}
          >
            Ir para o Login
          </ToastAction>
        ),
      });
    } catch {
      toast({
        title: "Algo deu errado!",
        description: "Não conseguimos criar sua conta no momento",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col ">
      <p className="text-sm text-muted-foreground mb-4 text-center">
        Cadastre-se na nossa plataforma para organizar seus grupos e listas
      </p>
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
          <Button disabled={signUpRequest.isPending} className="w-full">
            {signUpRequest.isPending ? (
              <RxReload className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Cadastrar"
            )}
          </Button>
        </form>
      </Form>
      <div className="space-x-4 mt-4 text-center">
        <Link className="text-primary hover:underline" to="/">
          Voltar para o Login
        </Link>
      </div>
    </div>
  );
}
