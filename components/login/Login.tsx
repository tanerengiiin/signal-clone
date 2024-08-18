"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import SignalLogo from "../signal-logo";

const Login = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-start gap-6 w-80">
      <SignalLogo className="w-16 h-auto"/>
      <div className="text-3xl font-semibold mt-2 text-primary/90">Sign in to Signal</div>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full bg-primary/95 h-14 rounded-xl hover:bg-primary/85 transition-all shadow-sm active:scale-95"
      >
        <span className="text-primary-foreground font-semibold">
          Continue with Google
        </span>
      </button>
    </div>
  );
};

export default Login;
