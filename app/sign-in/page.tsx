"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "@/lib/auth-client";
import { SignInForm, SignInFormValues } from "@/components/sign-in-form";

export default function SignInPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (values: SignInFormValues) => {
    signIn.email(
      {
        email: values.email,
        password: values.password,
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
          toast.success(`Sign in succeeded.`);
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
        <SignInForm onSubmit={handleSubmit} isPending={isPending} />
      </div>
    </div>
  );
}
