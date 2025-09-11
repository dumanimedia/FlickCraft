"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { signUp } from "@/lib/auth-client";
import { SignUpForm, SignUpFormValues } from "@/components/sign-up-form";

export default function SignUpPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (values: SignUpFormValues) => {
    signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.firstName + " " + values.lastName,
      },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onSuccess: () => {
          router.push("/dashboard");
          toast.success(`Account created succesfully.`);
        },
        onError: ({ error }) => {
          toast.error(`Sign in failed. ${error.message}.`);
        },
      }
    );
  };
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignUpForm onSubmit={handleSubmit} isPending={isPending} />
      </div>
    </div>
  );
}
