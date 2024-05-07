"use client";
import * as z from "zod";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useTransition } from "react";
import Link from "next/link";
// import { reset } from '@/actions/reset'

const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    // setError("");
    // setSuccess("");
    // startTransition(() => {
    //   reset(values).then((data) => {
    //     setError(data?.error);
    //     // TODO : Add when we add 2FA
    //     setSuccess(data?.success);
    //   });
    // });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-12 gap-6 border-2 rounded-xl">
        <h1 className="text-xl">Welcome Back</h1>
        <div className="flex flex-col w-[400px] gap-6">
          <Form {...form}>
            <form
              className="flex flex-col items-start justify-center gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col items-start justify-center gap-4 w-full">
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
                          disabled={isPending}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
                disabled={isPending}
              >
                {" "}
                Send reset Email
              </Button>
            </form>
          </Form>
          <Link
            href="../auth/register"
            className="px-8 text-center text-sm text-muted-foreground hover:underline"
          >
            Don&apos;t have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetForm;