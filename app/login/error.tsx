// app/login/error.tsx
"use client";

import { Button } from "@heroui/button";


const LoginError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-bold text-red-500">
          Login Failed
        </h1>
        <p className="text-muted-foreground">
          There was a problem signing you in. Please try again.
        </p>
        <Button
          size="lg"
          radius="full"
          className="w-full"
          onPress={() => window.location.href = '/login'}
        >
          Return to Login
        </Button>
      </div>
    </div>
  );
};

export default LoginError;