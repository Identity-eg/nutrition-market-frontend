"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

import { useLogin } from "@/apis/auth";
import { useAuthStore } from "@/store/auth";
import CardAuthWrapper from "../card-auth-wrapper";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("Please enter a valid email address"),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  rememberMe: z.boolean(),
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authenticateUser = useAuthStore((state) => state.authenticateUser);
  const from = searchParams.get("from");
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: "amr@tawfik.com",
      password: "123456",
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  useEffect(() => {
    localStorage.setItem(
      "remember-me",
      JSON.stringify(form.watch("rememberMe"))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("rememberMe")]);

  function onSubmit(values: z.infer<typeof loginSchema>) {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        authenticateUser(data);
        router.replace(from ? `${from}?from=login` : "/");
        router.refresh();
      },
    });
  }

  return (
    <CardAuthWrapper
      description="Enter your email below to login to your account"
      title="Login"
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Remember Me</FormLabel>
                  <FormDescription className="typography-R12 text-gray-200">
                    You can save your data so you don’t need to login again.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </Form>
        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full"
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Sign in"
          )}
        </Button>
        <p className="text-gray-6 typography-R14">
          Don’t have an account?{" "}
          <Link className="text-black-3 typography-M14" href="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </CardAuthWrapper>
  );
}
