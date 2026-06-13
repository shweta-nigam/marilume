"use client";

import { signIn } from "better-auth/react";

export default function LoginButton() {
  return (
    <button
      onClick={() =>
        signIn.social({
          provider: "google",
        })
      }
    >
      Continue with Google
    </button>
  );
}