"use client";
import * as z from "zod";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    });
    if (response.ok) {
      router.push("/");
    } else {
      console.log("Registration failed!");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-12 gap-6 border-2 rounded-xl">
        <h1 className="text-xl">Create an account</h1>
        <div className="flex flex-col w-[400px] gap-6">
          <Form {...form}>
            <form
              className="flex flex-col items-start justify-center gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col items-start justify-center gap-4 w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Name"></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="email"
                          type="email"
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="password"
                          type="password"
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <FormError message={error} />
              <FormSuccess message={success} /> */}
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
              >
                Sign Up
              </Button>
            </form>
          </Form>

          <div className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our Terms Of Service and Privacy
            Policy
          </div>
          <Link
            href="../auth/sign-in"
            className="px-8 text-center text-sm text-muted-foreground hover:underline"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
