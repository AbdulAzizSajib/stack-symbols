"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { loginAction } from "@/services/auth/login.action";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface LoginFormProps {
    redirectPath ?: string;
}

function hasErrorResponse(result: unknown): result is { success: false; message: string } {
    return typeof result === "object" && result !== null && "success" in result && (result as { success?: unknown }).success === false;
}

const LoginForm = ({ redirectPath }: LoginFormProps) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [formValues, setFormValues] = useState<ILoginPayload>({
        email: "",
        password: "",
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setServerError(null);
        setIsPending(true);

        try {
            const parsedPayload = loginZodSchema.safeParse(formValues);

            if (!parsedPayload.success) {
                setServerError(parsedPayload.error.issues[0]?.message ?? "Invalid input");
                return;
            }

            const result = await loginAction(parsedPayload.data, redirectPath);

            if (hasErrorResponse(result)) {
                setServerError(result.message || "Login failed");
            }
        } catch (error: any) {
            if (
                error &&
                typeof error === "object" &&
                "digest" in error &&
                typeof error.digest === "string" &&
                error.digest.startsWith("NEXT_REDIRECT")
            ) {
                throw error;
            }

            setServerError(error?.message ? `Login failed: ${error.message}` : "Login failed");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Card className="mx-auto w-full max-w-md shadow-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
                <CardDescription>Please enter your credentials to log in.</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={formValues.email}
                            onChange={(event) => setFormValues((current) => ({ ...current, email: event.target.value }))}
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            Password
                        </label>
                        <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={formValues.password}
                                onChange={(event) => setFormValues((current) => ({ ...current, password: event.target.value }))}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className="h-6 flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                            />
                            <Button
                                type="button"
                                onClick={() => setShowPassword((value) => !value)}
                                variant="ghost"
                                size="icon"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
                            </Button>
                        </div>
                    </div>

                    <div className="text-right">
                        <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {serverError ? (
                        <div className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                            {serverError}
                        </div>
                    ) : null}

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? (
                            <span className="inline-flex items-center gap-2">
                                <Loader2 className="size-4 animate-spin" />
                                Logging in...
                            </span>
                        ) : (
                            "Log In"
                        )}
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="justify-center border-t pt-4">
                <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
                        Sign Up for an account
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}

export default LoginForm