"use client";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

import { useForgotPassword } from "@/apis/auth";
import CheckEmail from "./CheckEmail";
import CardAuthWrapper from "../card-auth-wrapper";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("Please enter a valid email address"),
});

export default function ForgotPasswordPage() {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordMutation = useForgotPassword();

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    forgotPasswordMutation.mutate(values);
  }

  if (forgotPasswordMutation.isSuccess) {
    return <CheckEmail email={form.watch('email')} />;
  }

  return (
    <CardAuthWrapper
      description="You can request a password reset below. We will send a security code to
        the email address, please make sure it is correct."
      title="Recover your password"
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <Button
          type="submit"
          disabled={forgotPasswordMutation.isPending}
          className="capitalize w-full"
        >
          {forgotPasswordMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              please wait
            </>
          ) : (
            "request password reset"
          )}
        </Button>
      </form>
    </CardAuthWrapper>
  );
}
