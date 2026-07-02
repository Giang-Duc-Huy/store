"use client";

import { z } from "zod";
import { createAccount } from "../lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import OTPModal from "./OTPModal";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

type Formtype = 'sign-in' | 'sign-up';

const AuthForm = ({ type }: { type: Formtype }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const user = createAccount({ name: values.email, email: values.email });

      setAccountId(user.accountId);
    } catch {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form space-y-8">
        <h1 className="form-title">
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </h1>
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your email" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage /> 
                </FormItem>
            )}
        />          
        <Button type="submit" className="w-full">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    </Form>

    {setAccountId && (<OTPModal email ={form.getValues("email")}
    accountId={setAccountId} />
  )
}

export default AuthForm
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setAccountId(user: Promise<void>) {
  throw new Error("Function not implemented.");
}

