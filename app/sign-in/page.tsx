"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { SignInForm, SignInFormValues } from "@/components/sign-in-form";

export default function SignInPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (values: SignInFormValues) => {
    authClient.signIn.email(
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
        },
        onError: ({ error }) => {
          alert(`Sign in failed. ${error.message}.`);
        },
      }
    );
  };
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          loading="lazy"
          width={512}
          height={512}
        />
      </div>
      <div className="flex flex-1 items-center justify-center px-4">
        <SignInForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
