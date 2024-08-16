"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ListChecks, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
	email: z.string().email({
		message: "Invalid email address.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

export default function SignIn() {
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		try {
			console.log("Form submitted");

			const signInResponse = await signIn("credentials", {
				email: values.email,
				password: values.password,
				redirect: false,
				// callbackUrl: "/dashboard",
			});

			if (signInResponse && signInResponse?.ok && !signInResponse.error) {
				console.log("Sign-in successful", signInResponse);

				router.replace("/dashboard");

				toast.success("Log in successful", {
					description: "You can now use your account.",
					action: {
						label: "Close",
						onClick: () => {},
						actionButtonStyle: {
							cursor: "pointer",
						},
					},
				});
			} else {
				toast.error("Sign-in failed", {
					description: signInResponse?.error || "Unknown error",
					action: {
						label: "Close",
						onClick: () => {},
						actionButtonStyle: {
							cursor: "pointer",
						},
					},
				});
			}
		} catch (error: any) {
			toast.error("Internal Server Error", {
				description: `An error occurred while signing in.\n${error.message}`,
				action: {
					label: "Close",
					onClick: () => {},
					actionButtonStyle: {
						cursor: "pointer",
					},
				},
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="w-full space-y-4 md:w-[30rem]">
			<div className="flex items-center justify-center gap-1 space-x-2 text-xl font-semibold">
				<ListChecks className="size-6" />
				<span>Applic</span>
			</div>

			<Card className="m-4">
				<CardHeader>
					<CardTitle className="text-2xl">Sign In</CardTitle>
					<CardDescription>
						Enter your credentials to access your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="johndoe@gmail.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center justify-between">
											Password{" "}
										</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="********"
												{...field}
											/>
										</FormControl>
										<FormMessage />
										<FormDescription className="text-end">
											<Link
												href="forgot-password"
												className="ml-auto text-gray-400 hover:text-gray-700"
											>
												Forgot your password?
											</Link>
										</FormDescription>
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full select-none"
								disabled={loading}
							>
								{loading ? (
									<div className="flex items-center justify-center space-x-1.5">
										<LoaderCircle className="h-4 w-4 animate-spin" />
										<span>Please wait...</span>
									</div>
								) : (
									"Log In"
								)}
							</Button>
							<div className="text-center text-sm text-gray-500">
								Don&apos;t have an account?{" "}
								<Link
									href={"sign-up"}
									className="text-black underline"
								>
									Sign up
								</Link>
							</div>
						</form>
					</Form>
					<div className="my-2 flex items-center">
						<div className="h-px flex-grow bg-gray-300"></div>
						<span className="text-md mx-4 flex-shrink font-semibold text-gray-500">
							or
						</span>
						<div className="h-px flex-grow bg-gray-300"></div>
					</div>
					<div className="flex flex-col items-center justify-center gap-4 md:flex-row">
						<Button
							variant="outline"
							className="w-full"
							onClick={() =>
								signIn("google", {
									redirect: true,
									callbackUrl: "/dashboard",
								})
							}
						>
							Sign In with Google
						</Button>
						<Button
							variant="outline"
							className="w-full"
							onClick={() =>
								signIn("github", {
									redirect: true,
									callbackUrl: "/dashboard",
								})
							}
						>
							Sign In with GitHub
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
