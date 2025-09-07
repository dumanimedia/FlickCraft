"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { SignUpForm, SignUpFormValues } from "@/components/sign-up-form";

export default function SignUpPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (values: SignUpFormValues) => {
    authClient.signUp.email(
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
        },
        onError: ({ error }) => {
          alert(`Sign up failed. ${error.message}.`);
        },
      }
    );
  };
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-1 items-center justify-center px-4">
        <SignUpForm onSubmit={handleSubmit} />
      </div>
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
    </main>
  );
}
